const router = require("express").Router();
const auth = require("../Middleware/auth");
const message = require("../message.js");
const Items = require("../Model/Items");
const Categories = require("../Model/Categories");


router.post("/additems",auth,async (req,res)=>{
    const {itemname,itemprice,categoryname}=req.body;
    const user = req.body.verifyuser;
    try{
        const created_item=await new Items({
            username:user.username,
            itemname:itemname,
            itemprice:itemprice,
            categoryname:categoryname
        });
        created_item.save();
        res.status(200).json(message("Successfully Created the Item",created_item));
    }catch(err){
        res.status(400).json(message("Error while creating the item"));
    }
})

router.get("/items",auth,(req,res)=>{
    const user = req.body.verifyuser;
    Items.find({username : user.username},(err,data)=>{
        if(err){
            res.status(400).json(message("Error while viewing the items"));
            return;
        }
        // console.log(data);
        res.status(200).json(message("Successfully Fetched the items",data));
    })
})

router.put("/updateitems",auth,(req,res)=>{
    const user = req.body.verifyuser;
    const {itemname,itemprice,categoryname}=req.body;
    Items.findOneAndUpdate({username:user.username},{
        username:user.username,
        itemname:itemname,
        itemprice:itemprice,
        categoryname:categoryname
    },(err,p)=>{
        if(err){
            res.status(400).json(message("Error while updating Items"));
            return;
        }
        res.status(200).json(message("Successfully Updated the Items"));
    })
})

router.delete("/removeitem/:id",auth,async(req,res)=>{
    const user=req.body.verifyuser;
    const item_id = req.params["id"];
    try {
        await Items.findOneAndDelete({username : user.username,_id : item_id});
        res.status(200).json(message("Successfully deleted Item"))
    } catch(err) {
        res.status(400).json(message("Error while deleting the Items"))
    }
})



router.post("/addcategory",auth,async(req,res)=>{
    const {categoryname}=req.body;
    const user=req.body.verifyuser;
    try {
        const created_category=await new Categories({
            username : user.username,
            categoryname : categoryname
        });
        created_category.save();
        res.status(200).json(message("Successfully created the category",created_category));
    } catch (err) {
        res.status(400).json(message("Error while creating the categories"));
    }
})

router.get("/category",auth,(req,res)=>{
    const user = req.body.verifyuser;;
    Categories.find({username : user.username},(err,data)=>{
        if(err){
            res.status(400).json(message("Error while viewing the Categories"));
            return;
        }
        // console.log(data);
        res.status(200).json(message("Successfully Fetched the Categories",data));
    })
})

router.put("/updatecategory",auth,(req,res)=>{
    const user = req.body.verifyuser;
    const {categoryname}=req.body;
    Categories.findOneAndUpdate({username:user.username},{
        username:user.username,
        categoryname:categoryname
    },(err,p)=>{
        if(err){
            res.status(400).json(message("Error while updating Categories"));
            return;
        }
        res.status(200).json(message("Successfully Updated the Categories"));
    })
})

router.delete("/removecategory/:id",auth,async(req,res)=>{
    const user = req.body.verifyuser;
    const category_id = req.params["id"];
    
    Categories.findOne({username : user.username,_id : category_id},async(err,data)=>{
        if(err){
            res.status(400).json(message("Error while deleting the Categroy"));
            return;
        }
        console.log(data);
        const categoryname=data.categoryname;
        await Items.deleteMany({username : user.username,categoryname : categoryname});
    });
    
    await Categories.findOneAndDelete({username:user.username,_id : category_id});
    res.status(200).json(message("Successfully Deleted"));


})

module.exports=router;