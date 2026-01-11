var express=require("express")
var router =express.Router();
var userModel=require('../model/User')


//signup api
router.post("/", async (req,res)=>{
  try {
    const { fname, ename, password } = req.body;
    if (!fname || !ename || !password) return res.status(400).send({ message: 'fname, ename and password are required' });
    const email = String(ename).toLowerCase().trim();
    const exists = await userModel.findOne({ ename: email });
    if (exists) return res.status(409).send({ message: 'Email already registered' });

    const user = new userModel({ ...req.body, ename: email });
    await user.save();
    res.status(201).send({ message: "User added successfully" });
  } catch (error) {
    console.error('Signup error', error);
    res.status(500).send({message:"Something went wrong"})
  }  
})

//api for loginnn
router.post('/login',async(req,res)=>{
    try {
        const email = String(req.body.ename || '').toLowerCase().trim();
        const user=await userModel.findOne({ename:email});
        if(!user){
            return res.status(404).send({message:"user not found"})
        }
        const valid = await user.comparePassword(req.body.password);
        if(!valid) return res.status(401).send({message: "Invalid password"});
        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(200).send({message:`Welcome ${user.role}`,user: safeUser})
    } catch (error) {
      console.error('Login error', error);
      res.status(500).send({message:"Something Went Wrong"})  
    }
})

module.exports=router;