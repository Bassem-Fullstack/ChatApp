

const mongoose = require("mongoose")



const userSchema = mongoose.Schema({

username : {

 type : String ,

 required : false ,

 unique : true ,

 trim : true 

} ,



email : {

 type : String ,

 lowercase : true ,

  required : false ,

  unique : true 

} , 


password : {

type : String ,

trim : true ,

minlength : 8 ,

required : false 

},


tokens : [

 {
  
  type : String

 }


] ,



profilePic : {


  url : {
    
    type : String , 
    
    default : null

  } ,

  public_Id : {
   
    type : String

  }

}


})


const user = mongoose.model("User" , userSchema)

module.exports = user