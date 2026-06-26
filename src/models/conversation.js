
const mongoose = require("mongoose")


const conversationSchema = mongoose.Schema({


 members : [

  {
   
    type : mongoose.Schema.Types.ObjectId ,

    ref  : "User" , 

    required : true
    

  }


 ] ,
 
 
 isGroup : {

    type : Boolean ,

    default : false // دة بيحدد ان محادثة عبارة عن شخصين فقط بيكون فولس لو اكتر من شخص هنغير قيمتوة في كونتليرر الى ترو وتبقي جروب لو اكتر من شخص هيعمل جروب ويسمي جروب بالأسم اللى هو عايزوة 


 } ,


 GroupName : {

  type : String ,

  trim : true

 }





}  , {timestamps : true} ) //  بنحدد اخر رسالة وصلت امتا او اخر رسالة كانت امتا)
 


const conversation = mongoose.model("Conversation" , conversationSchema)


module.exports = conversation