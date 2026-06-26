


const jwt = require("jsonwebtoken")


const User = require("../models/User")

const asyncHandler = require("./asyncHandler")




const auth = asyncHandler(async (req , res , next) => {


const userToken = req.header("Authorization").replace("Bearer" , "").trim()


if(!userToken) {

return res.status(400).json("User Token is not found")

}


const decode = jwt.verify(userToken , process.env.JWT_SECRET)

// بقولوة اتاكد من توكين مستخدم دخلوة في هيدر وتأكد من مفتاح سري


const getUser = await User.findOne({

_id : decode.userId ,

tokens : userToken


})


if (!getUser) {

  return res.status(401).json({

    message: "User not found"

  })
  
}


req.user = getUser 

req.token = userToken 


// req.user  دة الاوس هتستخدمة في اي كونتليرر تبع روت دة هوية مستخدم بيانات مستخدم وكل حاجة
             
// req.token دة توكين بتاع اي مستخدم هتستخدمة في كذا كونتليرر عندك

next() // خش خطوة بعد كدة بعد ما اتأكد من الهوية مستخدم



})


// userId دي جاي من لوجين المفتاح اللى انا خزنت فية الايدي بتاع مابتفك الشفرة وتتاكد فوق من توكين بيرجع لكدة اوبجكيت بص تحتك

// {
//   id: "684c123...",
//   iat: 1749880000,
//   exp: 1750484800 بيتأكد من توكين ويتأكد من الايدي خلاص يسمحلوة بدخول بدل ما كل شواية يعمل تسجيل دخول وايميل جديد
// }



module.exports = auth





