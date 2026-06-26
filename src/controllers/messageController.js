

const Messages = require("../models/message")


const asyncHandler = require("../middleware/asyncHandler")






const sendMessage = asyncHandler(async (req , res) => {


const conversationId = req.params.id


const { content } = req.body 

const sender = req.user._id // بشوف المستخدم اللى فاتح تلؤتي مين وبعت رسالة تلؤتي وبدأ المحادثة و دة بعرفة من لوجين اللى مستخدم سجل دخول تلؤتي و دخل بتوكين بتاعة من الاوس

// اعرف مين بعت رسالة مين مستخدم فاتح تلؤتي و دة بعرفوة من خلال توكين بتاعة واجيب الاوس بتاعة

const message = await Messages.create({
 

 conversationId , // هنخزن محادثة ايدي دي بنعرفها من لينك بتاع راوتر نعرف انهي محادثة بظبط محادثة واقف في انهي محادثة او بعت لانهي محادثة برايفت جروب و يبدأ يرسل فين 
 
 sender , // اليوسير بنعرفة من توكين يعني مسجل لوجين عندنا بعت رسالة من خلال  توكين بنعرف مين مستخدم بعت رسالة تلؤتي وسجل

 content , // رسالة بعتها بنشوفها 


})



res.status(201).json(message)


})

////////////////////////////////////////////////////////////////////////////////////////




// ### getMessages 



const getMessages = asyncHandler ( async ( req , res) => {


const getAllMessages = await Messages.find({ conversationId : req.params.id }).populate("sender" , "username email")

// conversationId : req.params.id انت عايز تجيب كل رسايل محادثة دي مش كل رسايل يوسير 

// .populate("sender" , "usernam email") بكتب اسم فيلد اسم فايلد بتاع موديل اللى انا عامل فيها ريفرنس بقولوة هاتلي منها اليوسير جوة فايلد يوسير دة هاتلي منة ايميل ويوسير نيم

// كل رسايل المحادثة دي بس مش بيجيب كل محادثات كلها بتاع شات تطبيق كلة للباقي مستخدمين


if(!getAllMessages){

res.status(400)

throw new Error("No Message Found")

}


res.status(200).json(getAllMessages)


})




//////////////////////////////////////////////////////////////////////////////////////////////////





// ### updateMessage 


const updateMessage = asyncHandler ( async ( req ,res ) => {

const {content} = req.body 


const id =  req.params.id // رسالة هتعدلها بنجيب ايدي بتاعها من رواتر


const message = await Messages.findByIdAndUpdate (


 id ,
 
 {content} ,
 
 
 {new : true , runValidators : true} // معناها حدث قيمة دي بقيمة جديدة جاية من بادي


)


if(!message){

 res.status(400)

 throw new Error("No Message Updated")

}


res.status(200).json(message)


})


///////////////////////////////////////////////////////////////////////////////////////////////////



// ##### deleteMessage 



const deleteMessage = asyncHandler ( async (req  , res) => {


const id = req.params.id    


const message = await Messages.findByIdAndDelete(id)


if(!message){
 
  res.status(400)
  
  throw new Error("No Message Has Removed")

}
 

res.status(200).json(message)

})







module.exports = {  deleteMessage , updateMessage , getMessages , sendMessage }















