const User = require("../models/user.model");

// Notification
module.exports.adminNotification = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("dashboards/admin-staff/notification", {
        user,
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
