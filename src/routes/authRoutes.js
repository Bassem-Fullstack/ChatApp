

const express = require("express")

const router = express.Router() 


const {Logout  , RegisterUser  ,  LoginUSer , AddNewPassword , sendRestEmail , verifyEmail } 

= require("../controllers/authController")


const auth = require("../middleware/auth")


const validate = require("../validations/validateMiddleware")

const {registerSchema , loginSchema} = require("../validations/schemaJoi")


router.post("/register" ,validate(registerSchema) ,  RegisterUser)


router.get("/verify-email/:token" , verifyEmail)

// هنا انا استخدمت جيت عشان بس مستخدم يضغط على لينك فقط احنا مش عايزين نبعت داتا احنا عايزين نودي مستخدم لصفحة يضغط على لينك وخلاص ونتأكد من هويتة بس مش عايزين نبعت داتا او فورم او تحديث الاميل او باسورد عشان كدة استخدمت جيت 

// Get = اي ضغط للينك بتستخدم جيت قاعدة احفظها كدة



router.post("/login" , validate(loginSchema) , LoginUSer) 


router.delete("/logout" , auth , Logout) // استخدمتها هنا عشان انا عايز لما مستخدم يخرج يمسح توكين بتاعة ويخرج برة صفحة عشان كدة استخدمت الاوس


router.post("/send-reset-link" , sendRestEmail) // هنا انت بتضيف ايميل وبتبعتوة لليوسير على جيميل فقط مجرد يوسير يفتح لينك ويضغطة علية هيظهرلوة فورم بقي اللى هو فونشين تحتيك بقي وهو تغيير باسورد لكن دة فونشين لأضافة ايميل مستخدم ونبعتوة ليوسير على جيميل بتاعة فقط دة بيعملوة راوتر دة فقط لينك على ايميل جميل عشان انت بتضيف ايميل بتضيف حاجة جديدة تبعت عليها لمستخدم معين راوتير بعدها بقي هو ريسيت باسورد وهو اننا نغير باسورد نفتح فورم فيها كتابة باسورد جديد ونضيفة فقط

// هنا استخدمت نفس كود كونتيلير بتاع راوتر جيت عشان خاطر هبعت باسورد جديد يعني مستخدم لما ينسي باسورد هنبعتلوة رسالة يضغط على لينك من خلال لينك دة يقدر يغير باسورد بتاعة يعني هنضيف باسورد جديد فقط يعني اضافة جديدة مش زاي جيت فوق يضغط على لينك خلاص كدة ثبت هوية 

// استخدمت بوست لان انت هتضيف باسورد جديد مش هتعدل باسورد وكمان انت مش عارف قيمة باسورد اللفات كان اية عشان كدة ضيفت بوست


router.post("/reset-password/:token" , AddNewPassword )

// دة بتاع تغيير باسورد لكن تاني فوقة بتاع لينك تأكيد تغيير باسورد فالتأكيد دة بيحتاج ايميل الايميل دة نبعتوة على جيميل من جيميل تروح تأكد علية بس مجرد لينك بضيف ايميلك يبعتة لجيميل لكن لينك اخير دة بقي بتاع تغيير باسورد بضغط علية يوديك لفورم تغيير باسورد 




module.exports = router