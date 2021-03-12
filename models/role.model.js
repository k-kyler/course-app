const mongoose = require("mongoose");

let roleSchema = new mongoose.Schema({});

let Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;
