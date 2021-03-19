const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Course = require("../models/course.model");

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
module.exports.studentSchedule = async (req, res) => {};

// Tuition fee
module.exports.studentTuitionFee = async (req, res) => {};
