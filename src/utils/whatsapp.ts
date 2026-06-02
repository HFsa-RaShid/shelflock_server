// src/utils/whatsapp.ts
import 'dotenv/config';

const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
const token = process.env.ULTRAMSG_TOKEN;

export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    const response = await fetch(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          to: to, // উদাহরণ: "88017XXXXXXXX"
          body: message,
        }),
      }
    );

    const result = await response.json();
    if (result.sent === "true") {
      console.log(`WhatsApp message sent successfully via Ultramsg!`);
    } else {
      console.error('Ultramsg Error:', result);
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};