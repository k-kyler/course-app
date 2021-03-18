const User = require("../models/user.model");
const Course = require("../models/course.model");

module.exports.infoTeacher = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let users = await User.find();

    res.render("info/teacher", {
        user,
        users,
    });
};

module.exports.infoCourse = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let courses = await Course.find();

    res.render("info/course", {
        user,
        courses,
    });
};
