const User = require("../models/user.model");
const Role = require("../models/role.model");

// Custom middleware to prevent user from accessing back to log in route if logged in
module.exports.preventWhenLogged = async (req, res, next) => {
    if (req.signedCookies.userId) {
        let user = await User.findById(req.signedCookies.userId);
        let role = await Role.findOne({ number: user.role });

        if (role === 5) {
            res.redirect("/dashboard/admin");
        } else if (role === 4) {
            res.redirect("/dashboard/student");
        } else if (role === 2) {
            res.redirect("/dashboard/teacher");
        }
    } else {
        next();
    }
};
