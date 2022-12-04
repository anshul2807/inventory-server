const router = require("express").Router();
const Users = require("../Model/Users.js");
const message = require("../message.js");
const jwt=require("jsonwebtoken");
const auth = require("../Middleware/auth");
const { resourceLimits } = require("worker_threads");

router.post('/login',async (req,res)=>{
    const user=req.body;
    const curr_user=await Users.findOne({username:user.username});
    // console.log(curr_user)
    if(curr_user==null){
        res.status(403).json(message("Not valid user"));
    }else if(curr_user.password != user.password){
        res.status(403).json(message("Incorrect Password"));
    }else{
        try{
            let token=jwt.sign(user,process.env.PRIVATE_KEY+"");
            res.status(200).json(message("Successfully Login",{token:token}))
        }catch(err){
            res.status(502).json(message("Error while login"));
        }
    }
})

router.post("/register",async (req,res)=>{
    let user=req.body;
    // console.log("user");
    const similar_user=await Users.find({username:user.username});
    if(similar_user.length > 0){
        res.status(402).json(message("User already registers"));
        return;
    }
    try{
        let created_user=new Users(user);
        await created_user.save();
        // console.log("Successfully created");
        res.status(200).json(message("User successfull created"))
    }catch(err){
        // console.log(err);
        res.status(402).json(message("Error while creating Database"))
        
    }
})

router.put("/update",auth,(req,res)=>{
    const {email,password}=req.body;
    const user = req.body.verifyuser;

    Users.findOneAndUpdate({username:user.username},{
        username : user.username,
        email : email,
        password:password
    },(err,p)=>{
        if(err){
            res.status(400).json(message("Error while updating Profile"));
            return;
        }
        res.status(200).json(message("Successfully updated the profile"));
    })
})

router.post("/logout",auth,(req,res)=>{
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader,"",{expiresIn : 1}, (logout , err) => {
        if(logout)res.status(200).json(message("You have been logout"));
        else res.status(404).json(message("Error"));
    })
})

module.exports = router;