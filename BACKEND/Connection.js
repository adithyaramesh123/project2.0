var mongoose=require("mongoose")
mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log("Connected to DB")
})
.catch(()=>{
    console.log("Erorr")
})