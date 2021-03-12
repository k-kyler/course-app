const User = require("../models/user.model");

// Dashboard
module.exports.dashboard = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("dashboards/notification", {
        user,
    });
};
