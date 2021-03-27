const User = require("../models/user.model");
const Notification = require("../models/notification.model");

// Notification
module.exports.teacherNotification = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let notifications = await Notification.find();

    res.render("dashboards/teacher/notification", {
        user,
        notifications,
    });
};

// Schedule
module.exports.teacherSchedule = async (req, res) => {};
