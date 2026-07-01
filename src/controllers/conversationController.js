


const Conversation = require("../models/conversation")



const asyncHandler = require("../middleware/asyncHandler")




const  CreatePrivateChat = asyncHandler(async (req , res) => {


 const { otherUserId } = req.body   


// الباك إند هيكريت المصفوفة بنفسه ويحط (رقمك أنت + رقم الشخص التاني)


  if (!otherUserId) {

    res.status(400)

    throw new Error("otherUserId is required")

  }



// تلؤتي في فروند اند لما تيجي تعمل محادثة مع نفس شخص بيحطك انت ونفس الشخص في كذا محادثة و دة خلط المفروض يكون في محادثة مابينكم بس محادثة واحدة فقط يعني مينفعش اكون بتكلم مع محمد و اروح تطبيق حططيني انا ومحمد في محادثة تانية مش نفس محادثة ولا نفس رسايل كل شواية يعمل كذا محادثة مع محمد مش نفس محادثة عايز اقولوة لو لقيت شخصين دولت متخزن عندك رجعلي محادثة بتاعتهم فقط


const existConversation = await Conversation.findOne({

isGroup : false , 

members : { $all :[ req.user._id , otherUserId ] , $size:2}

// $all دي خاصية في مونجو بقولوة هنا معناها هاتلي محادثة بتاعي انا و محمد مش مهم ترتيب مين بدأ الاول هاتلنا بس المحادثة بتاعتنا الفكرة من غير كلمة دي او خاصية دي المونجو هيروح يعمل محادثة جديدة ويبقي كدة انت مستفدتش حاجة عشان كدة استخدمت خاصية معناها هات كلة مش شرط ترتيب

// $size معناها هنا مش حجم انا هنا بحددلوة وبأكدلوة ان محادثة تكون مابين شخصين فقط عشان اضمن نفسي امان وميجبليش اكتر من محادثة في جروبات بأكدلوة برضو اني محادثة تكون مابين 2 فقط


})


if(existConversation){

return res.status(200).json(existConversation) // ريترن هنا بقولوة لو لقيت مستخدمين دولت عندك متخزنين في داتا بيز متعمليش محادثة جديدة خليهم في نفس محادثة يعني معني ريترن هنا اقف متكلمش كود بعد كدة ولا تعمل محادثة جديدة خليهم جوة نفس محادثة


// كلمة return هي السر. في لغة البرمجة، لما بتكتب return جوة الـ Function، أنت بتقول للكود: "ستوب! إحنا خلصنا شغلنا لحد هنا، ارجع بالنتيجة دي للمستخدم وماتكملش قراية لباقي السطور اللي تحتك"

}

const conversation = await Conversation.create({


members : [req.user._id  , otherUserId], // احنا كدة خزنة شخص الايدي فاتح تلؤتي مع الشخص الايدي بيكلموة والللى فروند اند يبعتوة نشوف محادثة مابين مين ومين 

// req.user._id دي جت من الاوس 

isGroup : false // هنا انا حددت ان قيمة فولس يعني معناها ان محادثة هتكون مابين اتنين فقط وكمان شرط فوق عاملوة ان محادثة يكون مابين اتنين فقط


})


res.status(201).json(conversation)


})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 



// #### GroupChat 



const CreateGroupChat = asyncHandler( async( req , res ) => {


const {members , GroupName} = req.body 

 const myId = req.user._id 

 const allMembers = [myId , ...members] // عملت ايدي للمستخدم وعملت سبيرد اوبيرتو عشان نضيف اكتر من مستخدم اكتر من ايدي يعني مثلا ضيفت ايدي بتاع باسم وكمان هنضيف الايدي بتاع باسم بأصحابة بنسخة قديمة وجديدة 


if(!allMembers || allMembers.length < 3) {

 
//  بقولوة لو متغير دة مش بيحتوي على قيمة او بيحتوي على قيمة محادثة لكن دة محادثة اقل من 3 يعني مش محادثة جروبات محادثة بين اتنين فقط ارميلي ايرورر دة

 res.status(400)

 throw new Error ("Group chat needs at least 3 members")

}


const conversation = await Conversation.create({


members : allMembers ,

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

