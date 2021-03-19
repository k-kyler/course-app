const User = require("../models/user.model");

module.exports.enrollCourse = async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(req.signedCookies.userId);
    let enrollNewCourse = await User.findOneAndUpdate(
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

module.exports.cancelCourse = async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(req.signedCookies.userId);
    let coursesEnrolled = user.coursesEnrolled;
    let newCoursesEnrolled = [];

    for (courseEnrolled of coursesEnrolled) {
        if (courseEnrolled.courseId !== id) {
            newCoursesEnrolled.push(courseEnrolled);
        }
    }

    let cancelEnrolledCourse = await User.findOneAndUpdate(
        {
            _id: req.signedCookies.userId,
        },
        {
            coursesEnrolled: newCoursesEnrolled,
        },
        { new: true }
    );

    res.json({
        code: 1,
        message: "Hủy khóa học thành công",
    });
};
