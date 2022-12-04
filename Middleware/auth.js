
const jwt=require("jsonwebtoken");
const message = require("../message");
require("dotenv").config()
module.exports=async function authuser(req,res,next){
    let token=req.header("Authorization").split(" ")[1];
    // console.log(req.header("Authorization"));
    try{
        let decoded=jwt.verify(token,SAFASFAS);
        req.body.verifyuser=decoded;
        next();
    }catch(err){
        res.status(402).json(message("Not authorised"));
    }

}