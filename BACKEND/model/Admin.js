const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
    aemail: String,
    apassword: String,
    aforgot: String
});

module.exports =
    mongoose.models.admin || mongoose.model("admin", adminschema);
