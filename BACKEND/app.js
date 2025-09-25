var express = require("express")
var cors = require("cors")
var dotenv=require("dotenv")
dotenv.config();
require("./Connection")

var port=process.env.PORT;

var app=express();


const userRoute=require("./Route/Userroute")


app.use(express.json())

app.use(cors())
app.use('/api',userRoute)


app.listen(port,()=>{
    console.log(`Server is up and Running ${port}`)
})