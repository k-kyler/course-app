const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    teacherId: String,
    studentId: String,
    coursesEnrolled: [
        {
            courseId: String,
            status: String,
        },
    ],
    role: Number,
    availableBalances: Number,
});

let User = mongoose.model("User", userSchema, "users");

module.exports = User;
