const mongoose=require('mongoose')
const Users =new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    creationdate:{
        type:Date,
        default:Date.now()
    }
})  
module.exports=mongoose.model("Users",Users);