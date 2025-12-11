// var express=require('express');
// var router=express.Router();
// var aModel=require('../model/Admin');

// router.post('/',(req,res)=>{
//     try {
//         aModel(req.body).save();
//         res.send("admin added successfully")
//     } catch (error) {
//      res.send(error)   
//     }
// })
// //api to get
// router.get('/Admin',async(req,res)=>{
//     try {
//         var data=await aModel.find();
//         res.send(data)
//     } catch (error) {
//         res.send(error)
        
//     }
// })

// module.exports=router;

const express = require('express');
const router = express.Router();
const NeededItem = require('../model/neededItems');

// Middleware for admin auth (basic example)
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  // Verify JWT here (use jsonwebtoken.verify)
  next();
};

// GET /api/admin/items - List items
router.get('/items', auth, async (req, res) => {
  const items = await NeededItem.find({}).sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/admin/items - Add item
router.post('/items', auth, async (req, res) => {
  const { name, description, quantityNeeded, category } = req.body;
  const item = new NeededItem({ name, description, quantityNeeded, category });
  await item.save();
  res.json({ success: true, item });
});

// PUT /api/admin/items/:id - Update item
router.put('/items/:id', auth, async (req, res) => {
  const { name, description, quantityNeeded, category } = req.body;
  const item = await NeededItem.findByIdAndUpdate(req.params.id, { name, description, quantityNeeded, category }, { new: true });
  res.json({ success: true, item });
});

// DELETE /api/admin/items/:id - Delete item
router.delete('/items/:id', auth, async (req, res) => {
  await NeededItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;