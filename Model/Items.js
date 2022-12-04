const mongoose=require('mongoose')
const Items =new mongoose.Schema({
    username:String,
    itemname:String,
    itemprice:String,
    categoryname:String,
    creationdate:{
        type:Date,
        default:Date.now()
    }
})  
module.exports=mongoose.model("Items",Items);