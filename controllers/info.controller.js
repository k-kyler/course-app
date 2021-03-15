const User = require("../models/user.model");

module.exports.infoTeacher = async (req, res) => {
    let users = await User.find();

    res.render("info/teacher", {
        users,
    });
};

module.exports.infoCourse = (req, res) => {
    res.render("info/course");
};
