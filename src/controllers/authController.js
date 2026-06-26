


const User = require("../models/User")


const jwt = require("jsonwebtoken")

const bcryptjs= require("bcryptjs")


const asyncHandler = require("../middleware/asyncHandler")

const sendEmail = require("../utils/sendEmail")

const crypto = require("crypto")


// ### RegisterUser 


const RegisterUser = asyncHandler(async (req , res) => {


const {username , email , password} = req.body


 const userExists = await User.findOne({email})


 if(userExists){

  res.status(400); 
  
  throw new Error ("user already exists")

 }



const hashPassword = await bcryptjs.hash(password , 10)


const verifyToken = crypto.randomBytes(32).toString("hex") // بعمل توكين عشوائي عشان اعرف اخلي نظام حقيقي وان مستخدم يدخل ايميلوة يكون حقيقي مش اي كلام يكون عندة جيميل


const user = await User.create({

username ,

email ,

password : hashPassword , 

VerifyToken : verifyToken , // هنا بيخزن توكين عشوائي في داتا بيز لما مستخدم يعمل ريجيستر 

IsVerified : false // هنا بيكون فيرياتي قيمتة ديفلوت يعني لو مستخدم سجل دخول وضغط على لينك اللينك دة هيتحول ترو على طول فيسمحلوة بلوجين على طول لما يروح على جيميل يضغط يلاقي كود اتفعل وطبعا هنعمل فونشين تحت نمسح فيها توكين عشوائي دة ونخزن توكن محلي بتاعنا عشان خاطر يكون مسجل دخول على ويب سايت بجد

})

// لينك ويب سايت هنكتبوة هنا ورسالة هنبعتوة لجيميل فية لينك بتاعنا


const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`

// هنا كتبنا لينك اللى هيودية مباشرة على فروند اند صفحة جيميل يضغط على زر ويفعل ايميلة مجرد ضغط على زر تأكيد ايميل خلاص هو يعتبر سجل دخول

await sendEmail ({

to : user.email , 

subject : "Verify Email" ,

text : `click this button to verify email : ${verifyUrl}`

})





res.status(201).json({message : "user registered successfully" , 

user : {
 
 username : user.username ,

 email : user.email

}})

})



////////////////////////////////////////////////////////////////////////////////////////////////


// ### verifyEmail هنعمل فونشين نتأكد فية ان مستخدم فعلا ضغط على زر تأكيد واتأكد من ايميلوة وبعدها نضيف بقي توكين حقيقي بتاعنا بدل توكين شرط عشوائي احنا عاملينوة ويبدأ يخش ويب سايت عادي دة فونشين لوحدة في حالة تأكيد باسورد لوجين مش هيدخلوة الا لما يتأكد ان هو فعلا راح على جيميل اتأكد اني مستخدم راح ايميل جيميل بتاعة وضغط على زر ولما يضغط على زر خلاص فونشين اشتغل خلاص كلة تمام يبدأ بقي يضيف توكين حقيقي لهو ويقدر يسجل بأميلة بعد كدة كلوجين وخلاص بقي نقدر نغير حالة تأكيد بدل ما هي فولس تبقي ترو 



const verifyEmail = asyncHandler(async ( req , res ) => {


 const {token} = req.params   

// {token} توكين دي اللى جاية من روت بقولوة هاتلي توكين اللى جاي من رواتير باك اند يو ار ال وقارنهالي بتوكين متخزن عندي لو نفس توكين مطابقين زاي بعض خلاص امسح توكين عشوائي دي وخزنلي توكين اصلية احنا عاملنها واسمح للمستخدم يخش نظام عادي

// بجيب توكين في يو ار ال في راوتير باك اند عندي انا عاملوة بقارنوة بنفس توكين عشوائي متخزن عندي لو زاي بعض خلاص اسمح للمستخدم يخش تطبيق وامسح توكين عشوائي وحطيلي توكين اصلي 

// req.params دي بترجع اوبجكيت اي قيمة جاي من راوتر بص تحتك كدة   


// router.get("/verify-email/:token", verifyEmail) توكين في يو ار ال دة بيرجع اوبجيكيت لو انت عايز تستخدمة دة قيمة


// هنا ترو يعني مستخدم سجل دخول ضغط على لينك جيميل واتأكدنا من هويتة خلاص بقي قولي في داتا بيز ترو يعني سجل دخول وضغط على لينك

// احذفلي توكين عشوائي يعني غير معرف يعني بالعربي بقولوة شيلوة عشان بقي هنخزن توكين اصلي في لوجين وقت مابيعمل لوجين


const user = await User.findOne({ VerifyToken : token })


if(!user){

  res.status(400) 
  
  throw new Error("Invalid Token")   
 
// لو مفيش توكين وصل ابعت رسالة ان توكين مش زاي بعض مش متطابقين يعني مش نفس توكين

}


user.IsVerified =  true 

user.VerifyToken = undefined 


await user.save() // سيف كلام دة في داتا بيز


res.status(200).json({ message : "Email verified successfully" })


})






//////////////////////////////////////////////////////////////////////////////////////////////////// 




// ### login 


const LoginUSer = asyncHandler(async(req , res) => {



const { email , password} = req.body

 const user = await User.findOne({email})
 
 
 if(!user){

res.status(401)

 throw new Error ("Invalid email or password")

}



if(!user.IsVerified){


 res.status(400)

 throw new Error("Please verify your email first") 

 // في حالة لو مستخدم مسجلش ايميلوة او متأكدش من ايميلوة وقتها بقولوة في لوجين روح سجل ايميلك اضغط على زر تأكيد عشان نظام يسمحلك بدخول

}


const isMatch = await bcryptjs.compare(

password ,


user.password

)


if(!isMatch){

res.status(401)

throw new Error ("Invalid email or password")

}



const token = jwt.sign(

 {  userId : user._id } ,
 
  
 process.env.JWT_SECRET ,

 {  expiresIn : "7d" }


)
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." دة تشفير الايدي والمفتاح السري و دة بيتخزن في مونجو ديبي


user.tokens.push(token) // خزنة التوكين في مصفوفة داتا بيز

await user.save() // سيفنها وحفظناها


res.status(200).json({ message : "Logged Sucessful" , user: {


 id : user._id ,

username : user.username ,

email : user.email


}, tokens : token })



})


//////////////////////////////////////////////////////////////////////////////////////////// 


// #### Logout 




const Logout = asyncHandler(async(req , res ) => {

req.user.tokens = [] ; 

// req.user اللي جاية من الاوس ميديل وير

await req.user.save()


res.status(200).json({message : "Logged Out Succesfully"})


})




//////////////////////////////////////////////////////////////////////////////////////////////////////


// ### forgetPassword  في حالة لو مستخدم نسي باسورد بتاعة نعمل اية نعمل صفحة بسيطة عشوائية فيها انبوت وزار سبميت لو مستخدم نسي باسورد يضغط علية ويغير باسوردة قديمة ويعمل باسورد جديد 

const sendRestEmail = asyncHandler( async ( req , res) => {


 const {email} = req.body
 
 
 const getUser = await User.findOne({email})


 if(!getUser){

 res.status(400) 

 throw new Error("Can't Found User Email")

 }


 const createRandomToken = crypto.randomBytes(32).toString("hex")

//  بقولوة كريتلي توكين عشوائي اي كلام يسمح للمستخدم يخش يجيب ايميلوة ويعمل باسورد جديد وبعد كدة نعرض توكين دة في شريط بحث

 
getUser.restPasswordToken = createRandomToken // خزنلي توكين عشوائي دة في موديل بتاع داتا بيز احنا عاملينوة


const PasswordExpire = Date.now () + 10 * 60 * 1000 // بقولك احسبلي توقيت بظبط عشان نخلي مستخدم يعمل باسورد جديد لمدة عشر دقايق فقط


getUser.restPasswordExpire = PasswordExpire


await getUser.save() // بسيف كلام دة في داتا بيز بعدها بقي نبعت لينك والرد للمستخدم وفروند اند


const resetUrl = `${process.env.CLIENT_URL}/reset-password/${createRandomToken}`



await sendEmail({

 to : getUser.email , 

 subject : "Reset Password" ,

 text : `click here this link to reset your Password : ${resetUrl}`

})

// بنبعت ايميل بتاع مستخدم هنا ومعاة جيميل عشان نربطة بالباسورد جديد اللى هيعملوة في حالة لو نسي باسورد بتاعة


res.status(200).json({ message : "Reset link sent to your email"})




/// هنبدأ نكريت توكين عشوائي والكود دة ثابت سطر دة ثابت 

// // crypto دي مكتبة مدمجة مع نودي جيس جاية مع نودي جيس المكتبة وظيفتها انها تعمل ارقام وحروف متشفر زاي مكتبة بنستخدمها في توكين كدة الهدف احنا استخدمناها هنا مستخدمنهاش في توكين لان في توكين بنعمل توكين جديد ثابت مش عشوائي زاي دة وغير كدة كمان احنا بنبعت داتا وبيانات داخل توكين لكن الهدف من هنا مختلف الهدف نعمل ارقام وحروف عشوائية فقط مش هنبعت فيها داتا ولا اي حاجة هنبعت فيها بس رقم دة او نص عشوائي زاي توكين نبعتوة لشريط لينك فوق كدة 

// // jwt كان ممكن تستخدمة عادي بس علميا المطورين مش بيستخدمو  وغير كدة تبعت فية بيانات زاي الايدي ويوسير نيم وكدة وغيرها بس دة الهدف منة يعني ومحتاج تعمل مفتاح سري وتروح تتأكد مفتاح سري وحوارات 

// // crypto كلمة دي جاية من كلمة تشفير علم تشفير معناها كدة 

// // دة لينك صفحة بتاعت فروند اند الفكرة احنا مش عايزين نفتح صفحة ايباي ونبعت رد في جيسون احنا عايزين نفتح صفحة عادية لوحدها فيها انبوت وسبيميت فقط مش لازم اعمل ايباي جديد وبيانات وحوارات وانا عايز ابعت لينك مستخدم يفتحوة هو فروند اند يفتحوة مش عايزوة يرجعلي رد من فروند اند هو زاي فورم بيكتبوة مستخدم  api 

// // بقولوة كريتلي انشألي توكين عشوائي ولا نبعت داتا فية ولا اي حاجة مجرد توكين هيظهر في شريط بحث فقط فوق في حالة لما مستخدم يعوز يغير باسورد بتاعة الهدف نعمل توكين عشوائي نحطة في شريط بحث لينك يظهر فوق في لينك احسن ماتروح تكريت توكين جديد ومفتاح سري وتتأكد من الهوية وحوار كبير


})



///////////////////////////////////////////////////////////////////////////////////////


// ### sendResetEmail بيخزن توكين عشوائي 

//  ### AddNewPassword دة بيجيب توكين عشوائي اتخزن ويقارنوة بنفس توكين بتاع لينك جايلوة ولا لاء

// ### AddNewPassword دة باسورد جديد هيضيفوة المستخدم بعد ما راح الفورجيت باسورد هنا بقي نعمل فونشين نخلية يضيف باسورد جديد ويخزنوة



// const AddNewPassword = asyncHandler( async (req , res) => {


// const {password} = req.body 

// const {token} = req.params 


// const getUser = await User.findOne({ restPasswordToken : token }) //  جيبت توكين عشوائي متخزن عندي وقارنتهم ببعض لو مطابقين يبدأ نخزن باسورد جديد للمستخدم يعني بقولوة هاتلي توكين عشوائي متخزن عندك في ديبي اللى هو بيساوي نفس توكين بتاع يو ار ال اللى مستخدم ضغط علية في لينك هيلاقيهم شبة بعض هيجبلك يوسير دة تفاصيلة كلة


// if(!getUser){

// res.status(400)

// throw new Error("Invalid Token")   
 

// }


// if(getUser.restPasswordExpire < Date.now()){

//  res.status(400)
 
//  throw new Error("Token Expired, Please request a new one")

//  // في حالة لو وقت خلص 10 دقايق خلي مستخدم يروح يعمل توكين تاني


// }

// const hashPassword = await bcryptjs.hash(password , 10)

// getUser.password = hashPassword 

// getUser.restPasswordToken = undefined // نمسح توكين عشوائي بعد ما مستخدم خزن باسورد جديد خلاص بقي مالوش لازمة انا كنت بستخدمة وقت غرض معين وهو ان اوصل مستخدم لصفحة فورم باسورد ويخزن باسورد جديد كدة بعد ما الباسورد اتخزن خلاص بقي دولت بقي مالوش لازمة نستخدمهم انسي بقي خلاص خلصت مالوش لازمة ونوعا ما امان 

// getUser.restPasswordExpire = undefined


// await getUser.save()

// res.status(200).json({ message : "New Password Has Added Successfully" })

// })






const AddNewPassword = asyncHandler( async (req , res) => {

const {password} = req.body

const {token} = req.params 


const getUser = await User.findOne({ restPasswordToken : token}) // بشوف هو نفس توكين مستخدم اللى ضغط علي يو ار ال وتوكين دة اللى جاي من سيند ايميل بشوف هل توكين دة جاي من يو ار ال متخزن عندك في داتا بيز في توكين عشوائي لو نفس مستخدم ونفس توكين هيبدأ بقي مستخدم يغيرلوة باسورد بقي ويسمحلوة بتغيير باسورد


if(getUser.PasswordExpire < Date.now()){

// بقولوة لو وقت يوسير عدي اكتر من عشر دقايق متخزن عندي خلي مستخدم يرجع يطلب طلب تاني بيتغير باسورد ونقولوة وقت خلص ونعيد وقتة تاني ويسجل تاني من جديد كمان عشر دقايق تانين

res.status(400)

throw new Error("Time is up, Please request a new one")

}


// هنبدأ بقي نخزن باسورد جديد اللى هو هيكتبوة ونخزنوة بطريقة هاش وبعدها نمسح توكين ونمسح الوقت لان خلاص مش محتاجنهم تاني ولا هتخزنهم ولا تعمل اي حاجة بيهم امسح توكين عشوائي وامسح الوقت خلاص باسورد اتحفظ 


const hashPassword = await bcryptjs.hash(password , 10) 


getUser.password = hashPassword 

getUser.restPasswordToken = undefined // توكين عشوائي خلاص مش هتستخدموة بعد كدة امسحوة احسن و دة بيكون حاجة امنية عندك بتسمح توكين عشوائي في اي خطوة بتعملها لازم تمسح توكين عشوائي دة ممكن اي حد يخش يغير باسورد لو وقع تحت ايدة لينك 

getUser.restPasswordExpire = undefined // الوقت خلاص مش هتحتاجة في حاجة تاني باسورد اتسيف وكلة تمام


await getUser.save()

res.status(200).json({ message : "New Password Hass Added SucessFully" })

})









module.exports = { Logout  , RegisterUser , verifyEmail ,  LoginUSer , sendRestEmail , AddNewPassword}







