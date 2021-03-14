const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    role: Number,
});

let User = mongoose.model("User", userSchema, "users");

module.exports = User;
