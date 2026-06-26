

const express = require("express")


const router = express.Router()


const auth = require("../middleware/auth")

const { deleteMessage , updateMessage , getMessages , sendMessage } 

= require("../controllers/messageController")


router.post("/:id" , auth , sendMessage)

router.get("/:id" , auth , getMessages)

router.patch("/:id" , auth , updateMessage)

router.delete("/:id" , auth , deleteMessage)


module.exports = router 

