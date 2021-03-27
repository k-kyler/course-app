const mongoose = require("mongoose");

let scheduleSchema = new mongoose.Schema({
    teacherId: String,
    scheduleId: String,
    courseName: String,
    room: String,
    date: String,
    time: String,
});

let Schedule = mongoose.model("Schedule", scheduleSchema, "schedules");

module.exports = Schedule;
