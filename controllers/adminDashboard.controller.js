const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Course = require("../models/course.model");

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

    res.render("dashboards/admin-staff/schedule", {
        user,
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
