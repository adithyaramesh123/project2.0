var mongoose=require('mongoose');
var adminschema =mongoose.Schema({
    aemail:String,
    apassword:String,
    aforgot:String
    
})
var aModel=mongoose.model("admin",adminschema);
module.exports=aModel;