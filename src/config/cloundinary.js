


const cloudinary = require("cloudinary").v2


const dotenv = require("dotenv")


dotenv.config()


cloudinary.config({

 cloud_name : process.env.Cloudinary_Name , 

 api_key : process.env.Cloundinary_API_Key ,

 api_secret : process.env.Cloundinary_API_Secret


})

module.exports = cloudinary