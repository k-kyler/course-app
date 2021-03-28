const LearningSchedule = require("../models/learningSchedule.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const { v4: v4UniqueId } = require("uuid");

// Get learning schedule by id
module.exports.getLearningSchedule = async (req, res) => {
    let learningSchedule = await LearningSchedule.findOne({
        learningScheduleId: req.params.id,
    });

    if (learningSchedule) {
        res.json({
            code: 1,
            data: learningSchedule,
        });
    } else if (!learningSchedule) {
        res.json({
            code: 0,
            message: "Lịch học không tồn tại",
        });
    }
};

// Add learning schedule
module.exports.addLearningSchedule = async (req, res) => {
    let { courseId, room, date, time, teacherId } = req.body;

    if (courseId === "") {
        res.json({
            code: 0,
            message: "Tên lịch học không được bỏ trống",
        });
    } else if (room === "") {
        res.json({
            code: 0,
            message: "Phòng không được bỏ trống",
        });
    } else if (date === "") {
        res.json({
            code: 0,
            message: "Ngày không được bỏ trống",
        });
    } else if (time === "") {
        res.json({
            code: 0,
            message: "Thời gian không được bỏ trống",
        });
    } else if (teacherId === "") {
        res.json({
            code: 0,
            message: "Giảng viên không được bỏ trống",
        });
    } else {
        let learningSchedule = new LearningSchedule();
        let user = await User.findOne({ teacherId });
        let course = await Course.findOne({ courseId });
        let learningScheduleId = v4UniqueId();

        learningSchedule.learningScheduleId = learningScheduleId;
        learningSchedule.courseId = courseId;
        learningSchedule.date = date;
        learningSchedule.room = room;
        learningSchedule.time = time;
        learningSchedule.teacherId = teacherId;
        learningSchedule.save();

        res.json({
            code: 1,
            message: "Thêm lịch học thành công",
            data: {
                learningScheduleId,
                courseName: course.courseName,
                date,
                time,
                room,
                teacherName: user.fullname,
            },
        });
    }
};

// Edit learning schedule
module.exports.editLearningSchedule = async (req, res) => {
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

// Delete learning schedule
module.exports.deleteLearningSchedule = async (req, res) => {
    let { id } = req.params;
    let course = await Course.deleteOne({ courseId: id });

    res.json({
        code: 1,
        message: "Xóa khóa học thành công",
    });
};
