


const express = require("express")


const router = express.Router()

const auth = require("../middleware/auth")

const {SearchUser , uploadAndUpdatePic} 

= require("../controllers/userController")

const multer = require("multer")

const upload = multer({ dest : "upload/" }) // دة مسار اللى هنحط فية صورة ريجوسيت فايل بتاعنا لما مستخدم يجي يحط صورة داخل فولدر دة اسمة ابليوت


router.get("/search" , auth , SearchUser )

router.patch("/profile-pic" , auth , upload.single("image") , uploadAndUpdatePic)

module.exports = router



// patch استخدمت لان بنحدث صورة لان صورة اصلا متخزنة مع يوسير في موديل ان صورة قيمتها نال يعني فاضية مفيش قيمة يعني دة بوست لما مستخدم بيسجل صورة بتبقي قيمتها نال افتراضي عشان كدة استخدمت تحديث باتش







