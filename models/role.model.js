const mongoose = require("mongoose");

let roleSchema = new mongoose.Schema({
    role: String,
    number: Number,
});

let Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;
