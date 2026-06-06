// // src/jobs/expiryCheck.job.ts
// import cron from 'node-cron';
// import { getPrisma } from '../config/prisma.js';
// import { sendWhatsAppMessage } from '../utils/whatsapp.js';

// // 🔄 টেস্ট করার জন্য প্রতি মিনিটে রান হবে (সব ঠিক থাকলে পরে '0 0 * * *' করে দেবেন)
// cron.schedule('* * * * *', async () => {
//   // console.log('⏰ Checking database for products expiring tomorrow...');
  
//   const prisma = getPrisma();

//   try {
//     // ১. ডাটাবেজ থেকে শুধু ঐসব প্রোডাক্ট আনুন যাদের অ্যালার্ট এখনও পাঠানো হয়নি
//     const products = await prisma.product.findMany({
//       where: { isAlerted: false },
//     });

//     // ২. আজকের তারিখের ঠিক ১ দিন পরের (আগামীকাল) তারিখটি YYYY-MM-DD ফরম্যাটে নিন
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
    
//     // উদাহরণ: "2026-06-03" (টাইম বাদ দিয়ে শুধু ডেট স্ট্রিং)
//     const tomorrowString = tomorrow.toISOString().split('T')[0]; 

//     for (const product of products) {
//       // ৩. প্রোডাক্টের এক্সপায়ারি ডেটকেও YYYY-MM-DD ফরম্যাটে কনভার্ট করুন
//       const productExpiryString = new Date(product.expiryDate).toISOString().split('T')[0];

//       // 🔍 তুলনা: প্রোডাক্টের মেয়াদ কি আসলেই আগামীকাল?
//       if (productExpiryString === tomorrowString) {
//         console.log(`⚠️ Match Found! '${product.title}' expires tomorrow (${tomorrowString}).`);

//         // ৪. মেসেজ ফরম্যাট (তারিখটি একটু সুন্দর করে দেখানোর জন্য)
//         const formattedDate = new Date(product.expiryDate).toLocaleDateString('bn-BD');
//         const message = `⚠️ *ShelfLock Alert!* \n\nআপনার প্রোডাক্ট *"${product.title}"* এর মেয়াদ আগামীকাল (*${formattedDate}*) শেষ হতে যাচ্ছে। \n\n📦 বর্তমান স্টক: ${product.quantity} টি। \n\nঅনুগ্রহ করে দ্রুত প্রয়োজনীয় ব্যবস্থা নিন!`;

//         // ৫. .env থেকে ফোন নম্বর নেওয়া এবং '+' চিহ্ন থাকলে তা রিমুভ করা
//         let targetNumber = process.env.MY_WHATSAPP_NUMBER || '';
//         targetNumber = targetNumber.replace('+', '').trim(); // "+88018..." হয়ে যাবে "88018..."

//         if (targetNumber) {
//           // 🚀 হোয়াটসঅ্যাপ নোটিফিকেশন পাঠানো
//           await sendWhatsAppMessage(targetNumber, message);
          
//           // ৬. নোটিফিকেশন পাঠানো সফল হলে অ্যালার্ট স্ট্যাটাস true করে দেওয়া
//           await prisma.product.update({
//             where: { id: product.id },
//             data: { isAlerted: true },
//           });
//         } else {
//           console.log(`❌ No target phone number found in .env`);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('❌ Error running expiry cron job:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// });



// import cron from 'node-cron';
// import { getPrisma } from '../config/prisma.js';
// import { sendWhatsAppMessage } from '../utils/whatsapp.js';

// // 🔄 ডেভেলপমেন্ট টেস্টিংয়ের জন্য প্রতি মিনিটে রান হবে। লাইভ সার্ভারে দেওয়ার সময় '0 0 * * *' (প্রতিদিন রাত ১২টা) করে দেবেন।
// cron.schedule('* * * * *', async () => {
//   const prisma = getPrisma();

//   try {
//     // ১. সকল স্টোর এবং তাদের আন্ডারে থাকা প্রোডাক্টগুলোর লিস্ট তুলে আনা
//     const stores = await prisma.store.findMany({
//       include: {
//         products: true,
//         alertRule: true, // স্টোরের নিজস্ব এলার্ট সেটিংস প্লেড করা হলো
//       },
//     });

//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // শুধু ডেট কম্পেয়ার করার জন্য টাইম জিরো সেট করা হলো

//     for (const store of stores) {
//       const rule = store.alertRule;
      
//       // যদি ওনার কোনো কনফিগারেশন সেট না করে, তবে ডিফল্ট সেটিংস [30, 7, 3] কাজ করবে
//       const intervals = rule?.intervals || [30, 7, 3];
//       const messageTemplate = rule?.customMessage || "Alert! Your locked items are nearing expiry. Please take required action soon.";
      
//       let targetWhatsAppNumber = rule?.whatsappNumber || '';
//       targetWhatsAppNumber = targetWhatsAppNumber.replace('+', '').trim();

//       // স্টোরের যদি হোয়াটসঅ্যাপ নম্বর সেট করা না থাকে, তাহলে এটি স্কিপ করবে
//       if (!targetWhatsAppNumber) {
//         continue;
//       }

//       for (const product of store.products) {
//         const expiryDate = new Date(product.expiryDate);
//         expiryDate.setHours(0, 0, 0, 0);

//         // আজকের দিন থেকে এক্সপায়ারি ডেটের বাকি দিন হিসাব করা হচ্ছে
//         const diffTime = expiryDate.getTime() - today.getTime();
//         const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         // প্রোডাক্ট অলরেডি ডেট পার হয়ে গেলে ক্রন জব তা স্কিপ করবে
//         if (daysRemaining <= 0) continue;

//         // ২. চেক করা: আজকে যত দিন বাকি, তা কি ওনারের সিলেক্ট করা ইন্টারভালের মধ্যে আছে?
//         if (intervals.includes(daysRemaining)) {
          
//           // 🛡️ ডুপ্লিকেট মেসেজ সেফগার্ড: এই নির্দিষ্ট মাইলস্টোনে অলরেডি মেসেজ পাঠানো হলে আর পাঠাবে না
//           if (product.lastAlertedDay === daysRemaining) {
//             continue;
//           }

//           console.log(`⚠️ Expiry Milestone Match! '${product.title}' has exactly ${daysRemaining} days remaining.`);

//           // ৩. কাস্টম মেসেজের টেমপ্লেট ডাইনামিক ফিল্ডে কনভার্ট করা
//           // ওনার যদি তার টেক্সটবক্সে {product_name} বা {days_left} লেখে, তা রিপ্লেস হয়ে যাবে
//           const formattedDate = new Date(product.expiryDate).toLocaleDateString('bn-BD');
          
//           let parsedMessage = messageTemplate
//             .replace(/{product_name}/g, product.title)
//             .replace(/{days_left}/g, daysRemaining.toString());
            
//           // মেসেজের নিচে একটা স্ট্যান্ডার্ড ফুটার অ্যাপেন্ড করা
//           const finalMessage = `⚠️ *ShelfLock Dynamic Alert* \n\n${parsedMessage}\n\n📦 বর্তমান স্টক: ${product.quantity} টি। \n📅 মেয়াদ শেষের তারিখ: ${formattedDate}`;

//           // ৪. সরাসরি ওনারের ইনপুট দেওয়া নম্বরে হোয়াটসঅ্যাপ মেসেজ ডিসপ্যাচ করা
//           await sendWhatsAppMessage(targetWhatsAppNumber, finalMessage);
          
//           // ৫. ডেটাবেজে রিকর্ড আপডেট করা, যেন আজকে আর দ্বিতীয়বার মেসেজ না পাঠানো হয়
//           await prisma.product.update({
//             where: { id: product.id },
//             data: { lastAlertedDay: daysRemaining },
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.error('❌ Error running dynamic expiry rule cron job:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// });



import cron from 'node-cron';
import { getPrisma } from '../config/prisma.js';
import { sendWhatsAppMessage } from '../utils/whatsapp.js';


cron.schedule('* * * * *', async () => {
  const prisma = getPrisma();

  try {
    // ১. সকল স্টোর এবং তাদের আন্ডারে থাকা প্রোডাক্ট ও অ্যালার্ট রুলস তুলে আনা
    const stores = await prisma.store.findMany({
      include: {
        products: true,
        alertRule: true,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    for (const store of stores) {
      const rule = store.alertRule;
      
      // ওনার কনফিগারেশন সেট না করলে ডিফল্ট ইন্টারভাল [30, 7, 3] কাজ করবে
      const intervals = rule?.intervals || [30, 7, 3];
      
      //  আপনার দেওয়া মেসেজ স্ট্রাকচারটি এখানে ডিফল্ট টেমপ্লেট হিসেবে সেট করা হয়েছে
      const messageTemplate = rule?.customMessage || 
        "আপনার প্রোডাক্ট *\"{product_name}\"* এর মেয়াদ {days_left} শেষ হতে যাচ্ছে। \n\nঅনুগ্রহ করে দ্রুত প্রয়োজনীয় ব্যবস্থা নিন!";
      
      let targetWhatsAppNumber = rule?.whatsappNumber || '';
      targetWhatsAppNumber = targetWhatsAppNumber.replace('+', '').trim();

      // হোয়াটসঅ্যাপ নম্বর সেট করা না থাকলে স্টোরটি স্কিপ করবে
      if (!targetWhatsAppNumber) {
        continue;
      }

      for (const product of store.products) {
        const expiryDate = new Date(product.expiryDate);
        expiryDate.setHours(0, 0, 0, 0);

        // অবশিষ্টাংশ দিন হিসাব করা
        const diffTime = expiryDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // প্রোডাক্ট অলরেডি এক্সপায়ার হয়ে গেলে স্কিপ
        if (daysRemaining <= 0) continue;

        // ২. চেক করা: আজকের দিনটি কি ওনারের সিলেক্ট করা ইন্টারভালের মধ্যে আছে?
        if (intervals.includes(daysRemaining)) {
          
          // 🛡️ ডুপ্লিকেট মেসেজ সেফগার্ড
          if (product.lastAlertedDay === daysRemaining) {
            continue;
          }

          console.log(`⚠️ Expiry Milestone Match! '${product.title}' has exactly ${daysRemaining} days remaining.`);

          // ৩. দিন অনুযায়ী টেক্সট ডাইনামিক করা (১ দিন বাকি থাকলে "আগামীকাল", অন্যথায় "আর মাত্র X দিন")
          const dayText = daysRemaining === 1 ? "আগামীকাল" : `আর মাত্র ${daysRemaining} দিন পর`;
          const formattedDate = new Date(product.expiryDate).toLocaleDateString('bn-BD');
          
          // প্লেসহোল্ডার রিপ্লেস করা
          let parsedMessage = messageTemplate
            .replace(/{product_name}/g, product.title)
            .replace(/{days_left}/g, dayText);
            
          // ৪. আপনার চাওয়া হুবহু ফরম্যাটে চূড়ান্ত মেসেজ তৈরি (মেসেজ বডি + স্টক + এক্সপায়ারি ডেট)
          const finalMessage = `⚠️ *ShelfLock Alert!* \n\n${parsedMessage}\n\n📦 বর্তমান স্টক: ${product.quantity} টি। \n📅 মেয়াদ শেষের তারিখ: (${formattedDate})`;

          // ৫. সরাসরি ওনারের হোয়াটসঅ্যাপে মেসেজ পাঠানো
          await sendWhatsAppMessage(targetWhatsAppNumber, finalMessage);
          
          // ৬. ডেটাবেজে `lastAlertedDay` আপডেট করা
          await prisma.product.update({
            where: { id: product.id },
            data: { lastAlertedDay: daysRemaining },
          });
        }
      }
    }
  } catch (error) {
    console.error('❌ Error running dynamic expiry rule cron job:', error);
  } finally {
    await prisma.$disconnect();
  }
});