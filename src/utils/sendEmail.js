

// const nodemailer = require("nodemailer")


// const sendEmail = async(options) => {


//  const transPort = nodemailer.createTransport({

// //   service : "gmail", // اسم سيرفر او خدمة هتبعت على اية بقولوة على جيميل 

//    host: 'smtp.gmail.com',

//   port: 587, // المنفذ الآمن لإرسال الإيميلات

//   secure: true ,

//    auth : {

//     //  بكتب الهوية بتاعتي لاني انا بكلم جيميل بكتب الاميل والباسورد بتاعي بتاع جيميل بس باسورد مش بكتب باسورد بتاعي حقيقي عشان ممكن اي ويب سايت ياخد حسابي ويهكروة دي الطريقة الصح بتاع شركات
   
//    user: process.env.Email_Gmail ,

//    pass : process.env.Password_Gmail

// },

// tls: {
//        // السطر ده هو السر! بيمنع السيرفر (Railway) من رفض الاتصال بجوجل بسبب قيود شهادات الـ SSL
//        rejectUnauthorized: false 
//     }


// })   


// // createTransport  دة خاصية بتحط قيم بتاعتك وبترجعهالك اوبجكيت جواها ميثود في اكتر من ميثود من ضمنهم ميثود اسمها سيندميل وهو ارسال ايميل هنرسل ايميل لمين لمستخدم مين ومين هيبعت ايميل وهيبعتوة لمين كل دة داخل ميثود سيند ايميل




// await transPort.sendMail({

// from : process.env.Email_Gmail ,

// to : options.to , 

// subject : options.subject ,

// text : options.text 


// })


// // دالة دي وظيفتها اننا نكلم جيميل بحيث لو مستخدم نسي باسورد بتاعة يروح يضغط على جييميل بتاعة هيلاقي لينك تغيير او نسيان باسورد لو عايز يكتب باسورد جديد الفكرة احنا مش عايزين زر بتاع تغيير باسورد مستخدم يكتبوة كتير او يستخدمة كتير احنا بس بنستخدمة للمستخدم اللى هو عندة نفس ايميل عندنا متخزن في داتا بيز في حالة لو هو نسي باسورد نبعتلوة لينك على اميل في جيميلة لينك دة يضغط علية ويغير باسورد 

// // انا لما ابعت جيميل بتاعي ببعت اسم ايميل حقيقي لكن مبعتش باسورد حيقيقي بتاعي عشان ممكن حد يخش يخترق ايميل بتاعي موقع يخش يقرأ رسائل بتاعتي او ايميل عموما

// // nodemailer مكتبة وسيط ببين نودي جيس وما بين جيميل عشان تعرف تكلم جيميل وتبعت لينك على جيميل في حالة لو مستخدم نسي باسورد بتاعة نبعتلوة على ايميلوة في جيميل نودي جيس مبتعرفش تكلم وتبعت ايميل لجيميل لانها متخصصة في اعداد سيرفرات اندبوينت وايباي فقط


// // options استخدمتها كبارميتر عشان اقدر ابصيها في فونشين تاني لاني هبعت اكتر من قيمة يعني بدل ما اكتب كدة بص تحتك كتبت كلمة بارميتر واحدة شاملة كل قيم دي 

// // to , subject , text

// // اوبشين تو دي جاية من فوق فونشين اللى انا اختصرتها في اوبشين فوق بدل ما اكتب كل واحدة لوحدها قولت اعمل بارميتر مسؤلة عن تلات قيم فوق وخلاص وكذلك نفس كلام سبيجيكت



// }


// module.exports = sendEmail




// // const { Resend } = require("resend")

// // const resend = new Resend(process.env.RESEND_API_KEY)

// // const sendEmail = async (options) => {
// //   await resend.emails.send({
// //     from: "onboarding@resend.dev",
// //     to: options.to,
// //     subject: options.subject,
// //     text: options.text
// //   })
// // }


// // module.exports = sendEmail



// const Brevo = require('@getbrevo/brevo');

// const sendEmail = async (options) => {
//   // 1. افتح قسم إيميلات المعاملات مباشرة
//   const apiInstance = new Brevo.TransactionalEmailsApi();
  
//   // 2. مرر الـ API_KEY للحساب بتاعك فوراً
//   apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

//   // 3. جهز ظرف الجواب الفاضي
//   const sendSmtpEmail = new Brevo.SendSmtpEmail();

//   // 4. عبّي بيانات الإيميل
//   sendSmtpEmail.subject = options.subject; 
//   sendSmtpEmail.textContent = options.text; 
  
//   sendSmtpEmail.sender = { 
//     "name": "Chat App Support", 
//     "email": process.env.Email_Gmail 
//   };
  
//   sendSmtpEmail.to = [{ "email": options.to }];

//   // 5. أمر الإرسال الفوري
//   await apiInstance.sendTransacEmail(sendSmtpEmail);
// };

// module.exports = sendEmail;



const axios = require("axios");

const sendEmail = async (options) => {
  try {
    // بنعمل طلب POST مباشر لسيرفرات بريفو عبر بورت 443 المفتوح دايماً
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        // بيانات المرسل (أنت)
        sender: { 
          name: "Chat App Support", 
          email: process.env.Email_Gmail 
        },
        // بيانات المستلم (المستخدم اللي بيسجل)
        to: [{ email: options.to }],
        // عنوان الرسالة والنص
        subject: options.subject,
        textContent: options.text
      },
      {
        // هنا بنمرر الـ API Key في الـ Headers عشان السيرفر يعرف هوية حسابك
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        }
      }
    );
    console.log("Email sent successfully via Brevo API!");
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = sendEmail;