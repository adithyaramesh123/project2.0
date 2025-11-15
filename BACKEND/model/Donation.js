var mongoose=require('mongoose');
var adminschema = mongoose.Schema({
    money: { type: String, default: '' },
    sanitary: { type: Number, default: 0 },
    clothes: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    drinks: { type: Number, default: 0 },
    stationary: { type: Number, default: 0 }
});
var aModel=mongoose.model("admin",adminschema);
module.exports=aModel;