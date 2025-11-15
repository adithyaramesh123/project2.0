var express=require('express');
var router=express.Router();
var dModel=require('../model/Donation');
const mongoose = require('mongoose');

router.post('/',(req,res)=>{
    try {
        dModel(req.body).save();
        res.send("donation added successfully")
    } catch (error) {
     res.send(error)   
    }
})
//api to get
router.get('/donation',async(req,res)=>{
    try {
        var data=await dModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
        
    }
})
//delete
router.delete ('/delete/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        await dModel.findByIdAndDelete(req.params.id);
        res.send("Data Deleted")
    } catch (error) {
        res.send(error)
        
    }
})
//update
router.put('/update/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        await dModel.findByIdAndUpdate(req.params.id,req.body);
        res.send("Edited")
    } catch (error) {
      res.send(error)  
    }
})
module.exports=router;
var donationschema = mongoose.Schema({
    money: '',
    sanitary: 0,
    clothes: 0,
    food: 0,
    drinks: 0,
    stationary: 0,
});
exports.donationschema = donationschema;
