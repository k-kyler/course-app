const mongoose = require("mongoose");

let courseSchema = new mongoose.Schema({
    courseName: String,
    courseDescription: String,
    courseFee: Number,
    courseStart: String,
    courseTeacher: String,
});

let Course = mongoose.model("Course", courseSchema, "courses");

module.exports = Course;
