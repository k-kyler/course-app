const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Course = require("../models/course.model");
const Invoice = require("../models/invoice.model");

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
