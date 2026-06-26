


const getJoiSchema = require("./schemaJoi")




// schema دة بارميتر هنبعتوة من فونشين تاني بتاع ريجستر وبتاع لوجين يعني كأنك عملت كدة بص تحتك

// const validate = (registerSchema) 

// const validate = (loginSchema) 

//  ضربت عصفورين بحجر واحد بدل ما اروح اعمل فونشين تاني من اول وجديد لكل واحد فيهم


const validate = (schema) => {


return ( req , res , next ) => {


 const {error} = schema.validate(req.body) // دي خاصية موجودة داخل جوي يرجعلي فاليو وايرور بقولوة هاتلي ايرورر بتاع ريجوسيت بادي اللى ظهر في بادي داخل اوبجكيت ايرورر

 
 if(error){
    return res.status(400).json({ message : error.details[0].message }) // دة بيعرضلي رسالة بتاع جوي
 }

 next () // مفيش ايرورر كمل خطوة بعدها خش خطوة بعدها

}



}


// // if({error}) لو كنت قولتلوة كدة كان هيجبلك ايرور اوبجكيت لوحدة جديد خالص مالوش علاقة بايرورر عندك احنا فوق استدعيناها عشان خاطر نمسك ايرورر ونتشيك علية في حالة لو فية ايرورر احنا مش هيعرضلك ايرور هيعرضلك ايرورر تاني خالص قيمة جديدة مش نفس قيمة 


//  {error} هنا خاصية فالديت داخل جوي بترجع اوبجكيت فية قميتين ايرور وفاليو عشان كدة كتبت ايرور كأوبجيكيت عشان استدعية هنا متغير وبعدها نتشيك علية من غير اوبجكيت خلاص عشان نتأكد من صحة ايرور


module.exports = validate

//  ضربت عصفورين بحجر واحد بدل ما اروح اعمل فونشين تاني من اول وجديد لكل واحد فيهم بص تحتك


// بدل ما تكتب فونشين مرتين انا قولت اكتبها فونشين مرة واحدة وابعتلوة فونشين كبارميتر في فونشين واحد جواها فونشين بس وتوفر طريقة كتابة تحتيك دة

// // ❌ كده هتكتب نفس الكود مرتين
// const validateRegister = (req, res, next) => {
//     const { error } = registerSchema.validate(req.body)
//     if (error) return res.status(400).json({ message: error.details[0].message })
//     next()
// }


// const validateLogin = (req, res, next) => {
//     const { error } = loginSchema.validate(req.body)
//     if (error) return res.status(400).json({ message: error.details[0].message })
//     next()
// }