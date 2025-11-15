var express=require('express');
var router=express.Router();
var aModel=require('../model/Admin');

router.post('/',(req,res)=>{
    try {
        aModel(req.body).save();
        res.send("admin added successfully")
    } catch (error) {
     res.send(error)   
    }
})
//api to get
router.get('/Admin',async(req,res)=>{
    try {
        var data=await aModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
        
    }
})

module.exports=router;