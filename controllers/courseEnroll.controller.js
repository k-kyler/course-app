const User = require("../models/user.model");

module.exports.enrollCourse = async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(req.signedCookies.userId);
    let updateNewCourse = await User.findOneAndUpdate(
        { _id: req.signedCookies.userId },
        {
            coursesEnrolled: [
                ...user.coursesEnrolled,
                {
                    courseId: id,
                },
            ],
        },
        { new: true }
    );

    res.json({
        code: 1,
        message: "Đăng ký khóa học thành công",
    });
};

module.exports.cancelCourse = async (req, res) => {};
