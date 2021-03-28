const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Course = require("../models/course.model");
const LearningSchedule = require("../models/learningSchedule.model");

// Notification
module.exports.adminNotification = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let notifications = await Notification.find();

    res.render("dashboards/admin-staff/notification", {
        user,
        notifications,
    });
};

// Course
module.exports.adminCourse = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let courses = await Course.find();
    let users = await User.find();

    res.render("dashboards/admin-staff/course", {
        user,
        users,
        courses,
    });
};

// Schedule
module.exports.adminSchedule = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let courses = await Course.find();
    let learningSchedules = await LearningSchedule.find();
    let convertLearningSchedules = [];

    for (let learningSchedule of learningSchedules) {
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

    res.render("dashboards/admin-staff/schedule", {
        user,
        courses,
        learningSchedules: convertLearningSchedules,
    });
};

// Student
module.exports.adminStudent = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let users = await User.find();

    res.render("dashboards/admin-staff/student", {
        user,
        users,
    });
};

// Teacher
module.exports.adminTeacher = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let users = await User.find();

    res.render("dashboards/admin-staff/teacher", {
        user,
        users,
    });
};
