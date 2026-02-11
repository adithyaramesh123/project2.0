// One-off script: convert donations with non-ObjectId userId strings
// Usage: from repo root run: node BACKEND/scripts/fix_donations_userid.js

const mongoose = require('mongoose');
const path = require('path');

// load connection (reads process.env.mongodb_url)
require(path.resolve(__dirname, '..', 'Connection.js'));

const Donation = require(path.resolve(__dirname, '..', 'model', 'donations'));
const User = require(path.resolve(__dirname, '..', 'model', 'User'));

async function run() {
  try {
    console.log('Starting donation userId fix...');

    const donations = await Donation.find({}).lean();
    let updated = 0;

    for (const d of donations) {
      const uid = d.userId;
      if (!uid) continue;
      // skip if already an ObjectId
      if (mongoose.Types.ObjectId.isValid(uid)) continue;

      const lookup = String(uid).toLowerCase().trim();
      const user = await User.findOne({ ename: lookup }).select('_id fname ename').lean();
      if (user) {
        // update donation: set userId to the ObjectId and set donorName for immediate UI
        await Donation.updateOne({ _id: d._id }, { $set: { userId: user._id, donorName: user.fname || user.ename } });
        console.log(`Updated donation ${String(d._id).slice(0,8)} -> user ${user.ename} (${String(user._id).slice(0,8)})`);
        updated++;
      } else {
        // set donorName to the original string so UI shows something clearer
        await Donation.updateOne({ _id: d._id }, { $set: { donorName: uid } });
        console.log(`Donation ${String(d._id).slice(0,8)}: no user found for '${uid}', set donorName to string`);
        updated++;
      }
    }

    console.log(`Done. Donations processed/updated: ${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('Error in script:', err);
    process.exit(1);
  }
}

run();
