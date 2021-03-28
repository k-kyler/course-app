const mongoose = require("mongoose");

let examScheduleSchema = new mongoose.Schema({});

let examSchedule = mongoose.model(
    "examSchedule",
    examScheduleSchema,
    "examschedules"
);

module.exports = examSchedule;
