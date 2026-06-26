



const joi = require("joi")


const registerSchema = joi.object({


username : joi.string().min(3).max(30).required() ,

email : joi.string().email().required().messages({

 "string.email" : "Invalid email format" , // دة في حالة لو مستخدم دخل قيمة خطأ في ايميل
 
  "any.required" : "Email is required" // دة في حالة لو ايميل فاضي مستخدم مكتبوش يظهرلوة ايرور

}) ,

password : joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)

.required().messages({

 "string.min" : "Password must be at least 8 characters" ,

 "string.pattern.base" : "Password must contain uppercase, lowercase, number and special character" ,
 
 "any.required" : "Password is required" 

})


})


const loginSchema = joi.object({

 
 email : joi.string().email().required().messages({

    "string.email" : "Invalid email format" , 

    "any.required" : "Email is required"
   


 }) ,
 
 password : joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
 
 .required().messages({

  "string.min" : "Password must be at least 8 characters" ,

   "string.pattern.base" : "Password must contain uppercase, lowercase, number and special character" ,

   "any.required" : "Password is required"
     

 })

})


module.exports = {registerSchema , loginSchema}