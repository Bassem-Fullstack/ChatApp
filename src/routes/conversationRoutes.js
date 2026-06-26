


const express = require("express")

const router = express.Router()


const auth = require("../middleware/auth")


const {CreatePrivateChat , CreateGroupChat , getAllConversations , getOneConversation , deleteConversation }
  
= require("../controllers/conversationController")


router.post("/private-chat" , auth , CreatePrivateChat)


router.post("/group-chat" , auth , CreateGroupChat)


router.get("/" , auth , getAllConversations )


router.get("/:id" , auth , getOneConversation)


router.delete("/:id" , auth , deleteConversation)


module.exports = router