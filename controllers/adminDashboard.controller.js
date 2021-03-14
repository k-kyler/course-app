const User = require("../models/user.model");
const Notification = require("../models/notification.model");

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

    res.render("dashboards/admin-staff/course", {
        user,
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

    res.render("dashboards/admin-staff/student", {
        user,
    });
};

// Teacher
module.exports.adminTeacher = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("dashboards/admin-staff/teacher", {
        user,
    });
};
