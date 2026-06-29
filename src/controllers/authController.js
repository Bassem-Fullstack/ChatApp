


const User = require("../models/User")

const jwt = require("jsonwebtoken")

const bcryptjs= require("bcryptjs")


const asyncHandler = require("../middleware/asyncHandler")





// ### RegisterUser 


const RegisterUser = asyncHandler(async (req , res) => {


const {username , email , password} = req.body


 const userExists = await User.findOne({email})


 if(userExists){

  res.status(400); 
  
  throw new Error ("user already exists")

 }



const hashPassword = await bcryptjs.hash(password , 10)

const user = await User.create({

username ,

email ,

password : hashPassword , 

})




res.status(201).json({message : "user registered successfully" , 

user : {
 
 username : user.username ,

 email : user.email

}})

})



////////////////////////////////////////////////////////////////////////////////////////////////



// ### login 


const LoginUSer = asyncHandler(async(req , res) => {



const { email , password} = req.body

 const user = await User.findOne({email})
 
 
 if(!user){

res.status(401)

 throw new Error ("Invalid email or password")

}




const isMatch = await bcryptjs.compare(

password ,


user.password

)


if(!isMatch){

res.status(401)

throw new Error ("Invalid email or password")

}



const token = jwt.sign(

 {  userId : user._id } ,
 
  
 process.env.JWT_SECRET ,

 {  expiresIn : "7d" }


)
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." دة تشفير الايدي والمفتاح السري و دة بيتخزن في مونجو ديبي


user.tokens.push(token) // خزنة التوكين في مصفوفة داتا بيز

await user.save() // سيفنها وحفظناها


res.status(200).json({ message : "Logged Sucessful" , user: {


 id : user._id ,

username : user.username ,

email : user.email


}, tokens : token })



})


//////////////////////////////////////////////////////////////////////////////////////////// 


// #### Logout 




const Logout = asyncHandler(async(req , res ) => {

req.user.tokens = [] ; 

// req.user اللي جاية من الاوس ميديل وير

await req.user.save()


res.status(200).json({message : "Logged Out Succesfully"})


})



//////////////////////////////////////////////////////////////////////////////////////////////////////




module.exports = { Logout  , RegisterUser  , LoginUSer}







