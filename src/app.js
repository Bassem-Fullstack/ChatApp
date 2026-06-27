



const express = require("express")


const app = express()


app.use(express.json())


const cors = require("cors") 


app.use(cors({

origin : ["http://localhost:3000",

"https://chatapp-test-6daa.up.railway.app"
    
] , 


credentials : true 

}))

app.get("/" , (req , res)=> {


res.send("Server is working")


})





const UserRouters = require("../src/routes/authRoutes")


app.use("/users" , UserRouters)


////////////////////////////////////////////////////////////////////////////////////////////////////// 


const ConversationRouters = require("../src/routes/conversationRoutes")


app.use("/conv" , ConversationRouters)



///////////////////////////////////////////////////////////////////////////////////////// 


const MessageRouters = require("../src/routes/messageRoutes")


app.use("/messages" , MessageRouters)


//////////////////////////////////////////////////////////////////////////////////////////



const UserSearchRouter = require("../src/routes/userRoutes")


app.use("/people" , UserSearchRouter)


/////////////////////////////////////////////////////////////////////////////////////////////




app.use((req, res) => {

    res.status(404).json({ message: "Route not found" })

    // دة في حالة لو روتير اللى انت طلبتة مش موجود يعني مستخدم موصلش لهو ساعتها بقي بدل مايظهر اكواد اتشمل للفروند اند يظهر رسالة ان رويت مش موجود
})




// app.use((err , req , res , next) => {

//  لازم تكتب بارميتر كدة بتاع ايرورر الاربعة مع بعض عشان اكسبريس يعرف ان فونشين دة خاص بأيرورر لو كتبتلوة تلات بارميتر او بارميتر ايرورر واحد فقط من غير نيكست وريس وريجوسيت مش هيعرف يميزوة لازم اربعة بارميتر يكتبوة مع بعض
    
// })



app.use((err , req , res , next) => {


const statusCode = res.statusCode === 200 ? 500 : res.statusCode


res.status(statusCode).json({message : err.message})


// const statusCode = res.statusCode === 200 ? 500 : res.statusCode

// بقولو لو متغير ريس ستيتس كود جاي معاة رد 200 ومعاة 200 ايرور حولهولي 500 ايرورر اعرضلي رسالة 500 ايرور طبعا 500 ايرور دي معناها ان سيرفر وقع او في مشكلة في سيرفر 

// : res.status بقولوة لو رد 200 جاي معاة رسالة ايرورر اعرضهالي اللى هو 400 اعرضلي رسالة ايرور بتاعك 

})

////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = app 