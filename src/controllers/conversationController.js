


const Conversation = require("../models/conversation")



const asyncHandler = require("../middleware/asyncHandler")




const  CreatePrivateChat = asyncHandler(async (req , res) => {


 const { members } = req.body   


 if(!members || members.length !==2) {
 
   
    res.status(400)

    throw new Error ("Private chat needs 2 members only")
 
}



const conversation = await Conversation.create({


members ,

isGroup : false // هنا انا حددت ان قيمة فولس يعني معناها ان محادثة هتكون مابين اتنين فقط وكمان شرط فوق عاملوة ان محادثة يكون مابين اتنين فقط


})


res.status(201).json(conversation)


})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 



// #### GroupChat 



const CreateGroupChat = asyncHandler( async( req , res ) => {


const {members , GroupName} = req.body 



if(!members || members.length < 3) {


//  بقولوة لو متغير دة مش بيحتوي على قيمة او بيحتوي على قيمة محادثة لكن دة محادثة اقل من 3 يعني مش محادثة جروبات محادثة بين اتنين فقط ارميلي ايرورر دة

 res.status(400)

 throw new Error ("Group chat needs at least 3 members")

}


const conversation = await Conversation.create({


members , 

GroupName ,

isGroup : true // هنا انا فعلتها يعني معناها ان دة محادثة جروبات 


})


res.status(201).json(conversation)


})



/////////////////////////////////////////////////////////////////////////////////////////////////////


// ### Get All Conversations 





 const getAllConversations = asyncHandler ( async (req ,res) => {


 const getConversations = await Conversation.find({ members : req.user._id }).populate("members" , "username email")

//  بقولوة هاتلي محادثات يوسير ايدي فقط يعني متخليش يوسير يشوف محادثة يوسير تاني خالص مثال انا هنا بقولوة هاتلي محادثات باسم طبيعي هيجبلك محادثات باسم لان باسم هو يوسير مينفعش باسم يروح محادثات احمد مع مين او بيكلم مين او بعت رسالة لمين فهو هنا بيجبلك كل محادثات اللى عاملها يوسير مع اصدقاوءة فقط مش هيروح يشوف باقي محادثات اصدقاءوة مع اخرين

// req.user._id دة جاية من الاوس نثبت هوية

// يشوف كل محادثاتة هو اليوسير لكن ميشوفش محادثات ناس اخرين يعني ميشوفش احمد كان بيكلم محمد واليوسير اسمة باسم باسم يشوف كل محادثاتة فقط مع اشخاص اخرين


 if(!getConversations){

   res.status(400)

   throw new Error("Never Found Conversations")

 }



  res.status(200).json(getConversations) 

 })




///////////////////////////////////////////////////////////////////////////////////////////////


// ### getOneConversation


const getOneConversation = asyncHandler( async (req , res) => {


const id = req.params.id 


const getConversation = await Conversation.findById({ _id : id })


if(!getConversation) {

res.status(400)

throw new Error ("Never found a conversation")

}


res.status(200).json(getConversation)


})



///////////////////////////////////////////////////////////////////////////////////////////////


// ### removeOneConversation



const deleteConversation = asyncHandler( async (req , res) => {


const id = req.params.id 


const getAndDeleteConversation = await Conversation.findByIdAndDelete({ _id : id })


if(!getAndDeleteConversation){

 res.status(400)

 throw new Error("Can't find delete a conversaiton")


}


res.status(200).json(getAndDeleteConversation)


})








module.exports = {CreatePrivateChat , CreateGroupChat , getAllConversations , getOneConversation , deleteConversation }

