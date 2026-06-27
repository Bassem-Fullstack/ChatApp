

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




// 1. هنا بنستدعي مكتبة بريفو اللي نزلناها علشان نقدر نستخدم الفونكشنز بتاعتها
const Brevo = require('@getbrevo/brevo');

// 2. دي الفونكشن الأساسية اللي بتاخد الـ options (زي الـ to والـ subject والـ text)
const sendEmail = async (options) => {
  
  // 3. السطرين دول بنعرف بيهم المكتبة على حسابك، وبنمررلها الـ API_KEY اللي حطيناه على Railway
  let defaultClient = Brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY; 

  // 4. هنا بنعمل "نسخة" أو اوبجكت جديد مخصص لإرسال إيميلات المعاملات (Transactional Emails) زي تفعيل الحساب
  let apiInstance = new Brevo.TransactionalEmailsApi();
  
  // 5. وهنا بنعمل اوبجكت جديد عشان نملى فيه بيانات الإيميل نفسه (العنوان، النص، مين بيبعت ومين بيستقبل)
  let sendSmtpEmail = new Brevo.SendSmtpEmail();

  // 6. بنحط عنوان الإيميل اللي جاي لنا من برة الفونكشن
  sendSmtpEmail.subject = options.subject; 
  
  // 7. بنحط نص الرسالة أو اللينك اللي هيروح للمستخدم
  sendSmtpEmail.textContent = options.text; 
  
  // 8. هنا بنحدد اسم وتفاصيل المرسل (أنت)، وبياخد إيميل الجيميل بتاعك اللي متخزن في الـ Variables
  sendSmtpEmail.sender = { 
    "name": "Chat App Support", 
    "email": process.env.Email_Gmail 
  };
  
  // 9. هنا بنحدد المستلم، ولاحظ إنه مكتوب جوة أقواس مصفوفة [ ] لأن بريفو يقدر يبعت لكذا شخص في نفس الوقت
  sendSmtpEmail.to = [{ "email": options.to }];

  // 10. السطر السحري! هنا بنقول لبريفو ابعت الإيميل ده فوراً، والعملية دي بتم عبر بورت 443 المفتوح دايماً
  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

// 11. بنعمل export للفونكشن عشان تقدر تستدعيها وتستخدمها في ملف الـ auth أو الـ register
module.exports = sendEmail;