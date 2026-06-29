

// const axios = require("axios");

// const sendEmail = async (options) => {
//   try {
//     // بنعمل طلب POST مباشر لسيرفرات بريفو عبر بورت 443 المفتوح دايماً
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         // بيانات المرسل (أنت)
//         sender: { 
//           name: "Chat App Support", 
//           email: process.env.Email_Gmail 
//         },
//         // بيانات المستلم (المستخدم اللي بيسجل)
//         to: [{ email: options.to }],
//         // عنوان الرسالة والنص
//         subject: options.subject,
//         textContent: options.text
//       },
//       {
//         // هنا بنمرر الـ API Key في الـ Headers عشان السيرفر يعرف هوية حسابك
//         headers: {
//           'accept': 'application/json',
//           'api-key': process.env.BREVO_API_KEY,
//           'content-type': 'application/json'
//         }
//       }
//     );
//     console.log("Email sent successfully via Brevo API!");
//   } catch (error) {
//     console.error("Error sending email:", error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// module.exports = sendEmail;