

const mongoose = require("mongoose")



const userSchema = mongoose.Schema({

username : {

 type : String ,

 required : true ,

 unique : true ,

 trim : true 

} ,



email : {

 type : String ,

 lowercase : true ,

  required : true ,

  unique : true 

} , 


password : {

type : String ,

trim : true ,

minlength : 8 ,

required : true 

},


tokens : [

 {
  
  type : String

 }


] ,



restPasswordToken : {

type : String  // هنا بنخزن في موديل في داتا بيز توكين العشوائي في حالة لو مستخدم نسي باسورد بتاعة نديلوة توكين عشوائي من عندنا احنا عملناة في كونتليرر

},

restPasswordExpire : {

type : Date  // هنا احنا بنخزن التاريخ والوقت واستخدمنا نوع هنا الوقت والتاريخ استخدمنا ديت عشان خاطر نقدر نستخدموة هناك في كونتليرر توقيت وندي صلاحية وقت لمدة عشر دقايق ان مستخدم ينشيئ باسورد جديد في حالة لو نسي باسورد عشان كدة استخدمنا ديت مش رقم احنا عايزين نحسب الوقت والتاريخ و زمن قد اية عمل فيهم توكين وكمان يحسبلك الوقت والتاريخ اللى حصل فيها انشاء توكين عشوائي في قد اية ويكتبهالك كدة في داتا بيز 

}, 


VerifyToken : {
 
  type : String // بنخزن توكين عشوائي هنا بعد ما المستخدم ينشأ ايميلوة ونبعت ايميل بتاعة على لينك في جيميل ويروح يأكد عليها 

} ,


IsVerified : {

 type : Boolean , 

 default : false  // دة بيتأكد من ان المستخدم ضغط لينك وتأكدنا ان هو عامل ايميل على جيميل ولا لاء نتأكد من هويتة ان هو عندة ايميل على جيميل وكمان بنتأكد بعد كدة لو ضغط على لينك وخلاص وتأكد ان لينك دة راح لايميلة خلاص قيمة دي هتتغير بترو يعني مستخدم عندة ايميل فعلا هنا قيمتة هتتغير وتبقي ترو

},


profilePic : {


  url : {
    
    type : String , 
    
    default : null

  } ,

  public_Id : {
   
    type : String

  }

}


})


const user = mongoose.model("User" , userSchema)

module.exports = user