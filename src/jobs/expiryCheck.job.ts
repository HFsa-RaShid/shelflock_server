// src/jobs/expiryCheck.job.ts
import cron from 'node-cron';
import { getPrisma } from '../config/prisma.js';
import { sendWhatsAppMessage } from '../utils/whatsapp.js';

// 🔄 টেস্ট করার জন্য প্রতি মিনিটে রান হবে (সব ঠিক থাকলে পরে '0 0 * * *' করে দেবেন)
cron.schedule('* * * * *', async () => {
  // console.log('⏰ Checking database for products expiring tomorrow...');
  
  const prisma = getPrisma();

  try {
    // ১. ডাটাবেজ থেকে শুধু ঐসব প্রোডাক্ট আনুন যাদের অ্যালার্ট এখনও পাঠানো হয়নি
    const products = await prisma.product.findMany({
      where: { isAlerted: false },
    });

    // ২. আজকের তারিখের ঠিক ১ দিন পরের (আগামীকাল) তারিখটি YYYY-MM-DD ফরম্যাটে নিন
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // উদাহরণ: "2026-06-03" (টাইম বাদ দিয়ে শুধু ডেট স্ট্রিং)
    const tomorrowString = tomorrow.toISOString().split('T')[0]; 

    for (const product of products) {
      // ৩. প্রোডাক্টের এক্সপায়ারি ডেটকেও YYYY-MM-DD ফরম্যাটে কনভার্ট করুন
      const productExpiryString = new Date(product.expiryDate).toISOString().split('T')[0];

      // 🔍 তুলনা: প্রোডাক্টের মেয়াদ কি আসলেই আগামীকাল?
      if (productExpiryString === tomorrowString) {
        console.log(`⚠️ Match Found! '${product.title}' expires tomorrow (${tomorrowString}).`);

        // ৪. মেসেজ ফরম্যাট (তারিখটি একটু সুন্দর করে দেখানোর জন্য)
        const formattedDate = new Date(product.expiryDate).toLocaleDateString('bn-BD');
        const message = `⚠️ *ShelfLock Alert!* \n\nআপনার প্রোডাক্ট *"${product.title}"* এর মেয়াদ আগামীকাল (*${formattedDate}*) শেষ হতে যাচ্ছে। \n\n📦 বর্তমান স্টক: ${product.quantity} টি। \n\nঅনুগ্রহ করে দ্রুত প্রয়োজনীয় ব্যবস্থা নিন!`;

        // ৫. .env থেকে ফোন নম্বর নেওয়া এবং '+' চিহ্ন থাকলে তা রিমুভ করা
        let targetNumber = process.env.MY_WHATSAPP_NUMBER || '';
        targetNumber = targetNumber.replace('+', '').trim(); // "+88018..." হয়ে যাবে "88018..."

        if (targetNumber) {
          // 🚀 হোয়াটসঅ্যাপ নোটিফিকেশন পাঠানো
          await sendWhatsAppMessage(targetNumber, message);
          
          // ৬. নোটিফিকেশন পাঠানো সফল হলে অ্যালার্ট স্ট্যাটাস true করে দেওয়া
          await prisma.product.update({
            where: { id: product.id },
            data: { isAlerted: true },
          });
        } else {
          console.log(`❌ No target phone number found in .env`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error running expiry cron job:', error);
  } finally {
    await prisma.$disconnect();
  }
});