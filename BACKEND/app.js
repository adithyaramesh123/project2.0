// var express = require("express")
// var cors = require("cors")
// var dotenv=require("dotenv")
// dotenv.config();
// require("./Connection")

// var port=process.env.PORT;

// var app=express();


// const userRoute=require("./Route/Userroute")


// app.use(express.json())

// app.use(cors())
// app.use('/api',userRoute)


// //admin route
// const adminRoute=require("./Route/adminRoutes")
// app.use(express.json())
// app.use(cors())

// app.use('/api/admin',adminRoute)

// //donation route
//  const Donationroute=require("./Route/donationRoutes")
// app.use(express.json())
// app.use(cors())

// app.use('/api/donation',Donationroute)



// app.use('/api/donations', require('./routes/donationRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.listen(port,()=>{
//     console.log(`Server is up and Running ${port}`)
// })
// //hai

// var express = require("express")
// var cors = require("cors")
// var dotenv=require("dotenv")
// dotenv.config();
// require("./Connection")

// var port=process.env.PORT;

// var app=express();


// const userRoute=require("./Route/Userroute")


// app.use(express.json())

// app.use(cors())
// app.use('/api',userRoute)


// //admin route
// const adminRoute=require("./Route/adminRoutes")
// app.use(express.json())
// app.use(cors())

// app.use('/api/admin',adminRoute)

// //donation route
//  const Donationroute=require("./Route/donationRoutes")
// app.use(express.json())
// app.use(cors())

// app.use('/api/donation',Donationroute)



// app.use('/api/donations', require('./Route/donationRoutes'));
// app.use('/api/admin', require('./Route/adminRoutes'));
// app.listen(port,()=>{
//     console.log(`Server is up and Running ${port}`)
// })
// //hai


var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
require("./Connection");

var port = process.env.PORT;
var app = express();

app.use(express.json());
app.use(cors());

// User Route
const userRoute = require("./Route/Userroute");
app.use("/api", userRoute);

// Admin Route
const adminRoute = require("./Route/adminRoutes");
app.use("/api/admin", adminRoute);

// Donation Route
const donationRoute = require("./Route/donationRoutes");

// ⚠️ Only ONE mount — this is correct
app.use("/api/donations", donationRoute);

app.listen(port, () => {
  console.log(`Server is up and Running ${port}`);
});
