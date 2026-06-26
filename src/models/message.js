

const mongoose = require("mongoose")



const messageSchema = mongoose.Schema({


 conversationId : {

    type : mongoose.Schema.Types.ObjectId ,


    ref : "Conversation",

    // بنشوف رسايل اتبعت دي تبع انهي محادثة بظبط
   
    required : true // منخزنوش من غيرة 

 },
 
 
 sender : {
   
    type : mongoose.Schema.Types.ObjectId ,


    ref : "User" , 

    // بنتأكد ونشوف مين مستخدم بعت رسالة من خلال ايدي 


   required : true

 } ,



 content : {

 type : String , // طبعا محتوي رسالة بتكون نص مش رقم يعني زاي مثلا ازيك يا باسم دة نص محتوي عموما بيكون نص سترينج في شات
 

  required : true , 

  trim : true // مستخدم كتب حاجة في رسالة نلغي مسافة


 } 




} , {timestamps: true }) // ميعاد رسالة وصلت قد اية 



const messages = mongoose.model("Message" , messageSchema)


module.exports = messages