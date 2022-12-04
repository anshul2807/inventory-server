const mongoose=require('mongoose')
const Categories =new mongoose.Schema({
    username:String,
    categoryname:String,
    creationdate:{
        type:Date,
        default:Date.now()
    }
})  
module.exports=mongoose.model("Categories",Categories);