

const express = require("express")

const router = express.Router() 


const {Logout  , RegisterUser  ,  LoginUSer } 

= require("../controllers/authController")


const auth = require("../middleware/auth")


const validate = require("../validations/validateMiddleware")

const {registerSchema , loginSchema} = require("../validations/schemaJoi")


const passPort = require("passport")


const jwt = require("jsonwebtoken")



router.post("/register" ,validate(registerSchema) ,  RegisterUser)


router.post("/login" , validate(loginSchema) , LoginUSer) 


router.delete("/logout" , auth , Logout) // استخدمتها هنا عشان انا عايز لما مستخدم يخرج يمسح توكين بتاعة ويخرج برة صفحة عشان كدة استخدمت الاوس



router.get("/google" , 

passPort.authenticate("google" , {scope : ["profile" , "email"] , session : false , prompt:"select_account consent" })
    
)

// prompt:select_account consent السطر دة كنز بيحدف ايرور في كاش بيظهرلك معناها ان كاش او كوكيز بتاع جوجل موجود بيعرضلي صفحة ايرورر كود دة بيجبر  ان كود يشتغل غصب عن كاش وكوكيز 

// انت هنا في رواتر الاول بسبورد بيوديك لصفحة جوجل ومن صفحة جوجل بتطلب بيانات من مستخدم لو طلع بيانات متخزنة في جوجل وهو بروفايل اي معلومات شخصية والايميل بتاعة دة بيعملوة راوتر الاول راوتر تاني اشرحلك بقي بيعمل اية

// ("/google/callback") دي راوتر جاية من جوجل لازم تكتبها بظبط اللى انا جبتها من جوجل بص تحتك كدة 

// الراوتر الأول: روت البداية (بتاعك أنت، سميه زي ما تحب).


// لراوتر الثاني: روت العودة (بتاع جوجل، لازم يكون تبيكال ومطابق للـ Redirect URI اللي في الـ Dashboard بتاعة جوجل)

// لازم يكون رواتر تاني مطابق لنفس لينك بتاع جوجل  اللى انت عملتوة بنفسك هناك فهمت لان دة حلقة وصل هتكلم بة جوجل ويبعتلك بة بيانات لما يلاقي انت بتستخدم نفس لينك ونفس رواتر اسم مشابة على طول هيتأكد اية دة دة المطور اللى عمل ابليكشن و دة لينك اللى منة اقدر اكلموة ابعتلوة بيانات للباك اند 

// http://localhost:5000/users/google/callback


router.get("/google/callback" , 

passPort.authenticate("google" , {failureRedirect : `${process.env.CLIENT_URL}/users/login` , session : false }),


// دة الرد اللى رجع من جوجل بقولوة لو رد فشل و دية لصفحة لوجين يقوم بسبورد مودية لصفحة لوجين لان رفض تسجيل دخول ورفض  اجيب بياناتة و اخزنها عندي وبقولوة لو رفض خزنهالي في نفس توكين وهجبلك المفتاح السري والايدي بتاع يوسير وخزنهالي في داتا بيز 

async(req , res) => {


const token = jwt.sign({userId : req.user._id } , process.env.JWT_SECRET , {expiresIn : "7d"})  

//   اي توكين عبارة عن ايدي وعن مفتاح سري هنا انا جيبت نفس الايدي بتاع مستخدم وجيبت معاة مفتاح سري

// req.user._id دي جاي بسبورد بص تحتك ملف كونينفج اللي كنا كاتبين فيها اعداد خطوات 

// // user = {
//    _id: "687ab12...",
//    name: "Bassem",
//    email: "bassem@gmail.com" دة جاي من بسبورد من كونفينج ربط بتاع جوجل فايل كونفينج
// }


req.user.tokens.push(token) // بقولوة بعد ما جوجل سجل دخول خلاص احفظلي توكين بتاع مستخدم في داتا بيز توكينس 

await req.user.save()

// الفروند هيتأكد من هو المستخدم هيبعتلك طلب على سيرفر بتاعك عشان انت باك اند تتأكد من هويتة سيرفر بتاعك 5000 تمام بعد ما يخلص وجوجل تتأكد من هويتة خلاص خلصنا وسيفنا داتا وكل حاجة باك اند هيبصيك بقي لفروند اند تاني الفروند اند بعت طلب وحول مستخدم على سيرفر بتاعك عشان جوجل يتأكد من هويتة بعد ما خلص انت كباك اند ترجعوة تاني لفروند اند و دة سطر تحتيك بيعملوة 

res.redirect(`${process.env.CLIENT_URL}/auth/callback/${token}`)

}

)



// رواتر بيودي مستخدم لجوجل ويسجل دخول ويشوفوة هيسجل دخول ولا لاء هيرفض ولا لاء اما روات تاني بقولوة لو تسجيل دخول فشل خلاص ودية لصفحة لوجين طيب لو نجح خلاص بيقولك نجح تبدأ انت بقي تعمل توكين للمستخدم وتسسيفوة عندك في داتا بيز حوار بقي اتقبل او اترفض دة مش شغلتك دة كل دة بيحصل خلف كواليس من وراك عند بسبورد هو بيحدد اذا مستخدم اتقبل او اترفض فقط بقولوة فوق لو اترفض ودية لصفحة لوجين طيب لو هاتلي الطلب واعمل توكين وخزنه عندي في داتا بيز

module.exports = router