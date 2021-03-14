const Course = require("../models/course.model");
const { v4: v4UniqueId } = require("uuid");

// Get course by id
module.exports.getCourse = async (req, res) => {
    let course = await Course.findOne({
        courseId: req.params.id,
    });

    if (course) {
        res.json({
            code: 1,
            data: course,
        });
    } else if (!course) {
        res.json({
            code: 0,
            message: "Khóa học không tồn tại",
        });
    }
};

// Add course
module.exports.addCourse = async (req, res) => {
    let {
        courseName,
        courseDescription,
        courseFee,
        courseStart,
        courseTeacher,
    } = req.body;

    if (courseName === "") {
        res.json({
            code: 0,
            message: "Tên khóa học không được bỏ trống",
        });
    } else if (courseDescription === "") {
        res.json({
            code: 0,
            message: "Mô tả khóa học không được bỏ trống",
        });
    } else if (courseFee === "") {
        res.json({
            code: 0,
            message: "Học phí không được bỏ trống",
        });
    } else if (courseStart === "") {
        res.json({
            code: 0,
            message: "Ngày bắt đầu không được bỏ trống",
        });
    } else if (courseTeacher === "") {
        res.json({
            code: 0,
            message: "Giảng viên không được bỏ trống",
        });
    } else {
        let course = new Course();
        let courseId = v4UniqueId();

        course.courseId = courseId;
        course.courseName = courseName;
        course.courseDescription = courseDescription;
        course.courseStart = courseStart;
        course.courseFee = courseFee;
        course.courseTeacher = courseTeacher;
        course.save();

        res.json({
            code: 1,
            message: "Thêm khóa học thành công",
            data: {
                courseId,
                courseName,
                courseDescription,
                courseFee,
                courseStart,
                courseTeacher,
            },
        });
    }
};

// Edit course
module.exports.editCourse = async (req, res) => {
    let {
        courseName,
        courseDescription,
        courseFee,
        courseStart,
        courseTeacher,
    } = req.body;
    let { id } = req.params;

    if (courseName === "") {
        res.json({
            code: 0,
            message: "Tên khóa học không được bỏ trống",
        });
    } else if (courseDescription === "") {
        res.json({
            code: 0,
            message: "Mô tả khóa học không được bỏ trống",
        });
    } else if (courseFee === "") {
        res.json({
            code: 0,
            message: "Học phí không được bỏ trống",
        });
    } else if (courseStart === "") {
        res.json({
            code: 0,
            message: "Ngày bắt đầu không được bỏ trống",
        });
    } else if (courseTeacher === "") {
        res.json({
            code: 0,
            message: "Giảng viên không được bỏ trống",
        });
    } else {
        let course = await Course.findOneAndUpdate(
            { courseId: id },
            {
                courseName,
                courseDescription,
                courseFee,
                courseStart,
                courseTeacher,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật khóa học thành công",
            data: {
                courseName,
                courseDescription,
                courseFee,
                courseStart,
                courseTeacher,
            },
        });
    }
};

// Delete course
module.exports.deleteCourse = async (req, res) => {
    let { id } = req.params;
    let course = await Course.deleteOne({ courseId: id });

    res.json({
        code: 1,
        message: "Xóa khóa học thành công",
    });
};
