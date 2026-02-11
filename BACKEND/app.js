var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
require("./Connection");

var port = process.env.PORT || process.env.port || 2000;
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
app.use("/api/donations", donationRoute);

// Organization Route
const organizationRoute = require('./Route/organizationRoutes');
app.use('/api/organizations', organizationRoute);

// Contact Route
const contactRoute = require('./Route/contactRoutes');
app.use('/api/contact', contactRoute);

app.listen(port, () => {
  console.log(`Server is up and Running ${port}`);
});
