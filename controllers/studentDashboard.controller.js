const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Course = require("../models/course.model");
const Invoice = require("../models/invoice.model");
const LearningSchedule = require("../models/learningSchedule.model");
const ExamSchedule = require("../models/examSchedule.model");

// Notification
module.exports.studentNotification = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let notifications = await Notification.find();

    res.render("dashboards/student/notification", {
        user,
        notifications,
    });
};

// Course
module.exports.studentCourse = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let courses = await Course.find();

    res.render("dashboards/student/course", {
        user,
        courses,
    });
};

// Schedule
module.exports.studentSchedule = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let learningSchedules = await LearningSchedule.find();
    let examSchedules = await ExamSchedule.find();
    let invoices = await Invoice.find({
        studentId: user.studentId,
        status: "Đã hoàn tất",
    });
    let convertLearningSchedules = [];
    let convertExamSchedules = [];

    for (let learningSchedule of learningSchedules) {
        for (let invoice of invoices) {
            for (let course of invoice.courses) {
                if (course.courseId === learningSchedule.courseId) {
                    let course = await Course.findOne({
                        courseId: learningSchedule.courseId,
                    });

                    convertLearningSchedules.push({
                        learningScheduleId: learningSchedule.learningScheduleId,
                        room: learningSchedule.room,
                        date: learningSchedule.date,
                        time: learningSchedule.time,
                        teacherName: course.courseTeacher,
                        courseName: course.courseName,
                    });
                }
            }
        }
    }

    for (let examSchedule of examSchedules) {
        for (let student of examSchedule.students) {
            if (user.studentId === student.studentId) {
                let course = await Course.findOne({
                    courseId: examSchedule.courseId,
                });

                convertExamSchedules.push({
                    examScheduleId: examSchedule.examScheduleId,
                    examRoom: examSchedule.examRoom,
                    examDate: examSchedule.examDate,
                    examTime: examSchedule.examTime,
                    courseName: course.courseName,
                });
            }
        }
    }

    res.render("dashboards/student/schedule", {
        user,
        learningSchedules: convertLearningSchedules,
        examSchedules: convertExamSchedules,
    });
};

// Tuition fee
module.exports.studentTuitionFee = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let courses = await Course.find();

    res.render("dashboards/student/tuitionFee", {
        user,
        courses,
    });
};

// Payment history
module.exports.studentPaymentHistory = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let invoices = await Invoice.find({
        studentId: user.studentId,
        status: "Đã hoàn tất",
    });

    res.render("dashboards/student/paymentHistory", {
        user,
        invoices,
    });
};
