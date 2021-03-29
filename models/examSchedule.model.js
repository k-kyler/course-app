const mongoose = require("mongoose");

let examScheduleSchema = new mongoose.Schema({
    examScheduleId: String,
    courseId: String,
    examRoom: String,
    examDate: String,
    examTime: String,
    students: [
        {
            studentId: String,
        },
    ],
});

let ExamSchedule = mongoose.model(
    "ExamSchedule",
    examScheduleSchema,
    "examschedules"
);

module.exports = ExamSchedule;
