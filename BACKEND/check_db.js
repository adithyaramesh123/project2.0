const mongoose = require('mongoose');
const Donation = require('./model/donations');
const OrganizationRequest = require('./model/OrganizationRequest');
const Organization = require('./model/Organization');

const mongoUrl = "mongodb+srv://Adithya123:Adithya2005@cluster0.bxkdm8a.mongodb.net/Changinglives?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl)
    .then(async () => {
        console.log("Connected to DB");

        console.log("\n--- RECENT Organization Requests (Assigned/Accepted) ---");
        const requests = await OrganizationRequest.find({
            status: { $in: ['Assigned', 'Accepted', 'Picked'] }
        }).sort({ createdAt: -1 }).limit(5);

        requests.forEach(r => {
            console.log(`Request ID: ${r._id}`);
            console.log(`  Org: ${r.organizationId}`);
            console.log(`  Status: ${r.status}`);
            console.log(`  Assigned Donation: ${r.assignedDonationId}`);
        });

        console.log("\n--- RECENT Donations (Assigned/OutForPickup/Completed) ---");
        const donations = await Donation.find({
            status: { $in: ['Assigned', 'OutForPickup', 'Completed'] }
        }).sort({ createdAt: -1 }).limit(5);

        donations.forEach(d => {
            console.log(`Donation ID: ${d._id}`);
            console.log(`  Org: ${d.organization}`);
            console.log(`  Status: ${d.status}`);
            console.log(`  Items: ${d.itemDetails.map(i => i.name).join(', ')}`);
            console.log(`  Pickup Code: ${d.pickupCode}`);
        });

        console.log("\n--- Active Organizations ---");
        const orgs = await Organization.find({ status: 'Active' }).select('name email _id');
        orgs.forEach(o => console.log(`Org: ${o.name} (${o._id})`));

        process.exit();
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
