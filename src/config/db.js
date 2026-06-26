




const mongoose = require("mongoose")

const connectDB = async()=> {

try {

await mongoose.connect(process.env.DB_URL)

console.log("DB is Connected")

}

catch(e){

 console.log("DB : Error" , e.message)   

}


}


module.exports = connectDB