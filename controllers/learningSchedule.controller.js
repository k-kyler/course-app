const LearningSchedule = require("../models/learningSchedule.model");
const Course = require("../models/course.model");
const { v4: v4UniqueId } = require("uuid");

// Get learning schedule by id
module.exports.getLearningSchedule = async (req, res) => {
    let learningSchedule = await LearningSchedule.findOne({
        learningScheduleId: req.params.id,
    });
    let course = await Course.findOne({ courseId: learningSchedule.courseId });

    if (learningSchedule) {
        res.json({
            code: 1,
            data: learningSchedule,
            courseName: course.courseName,
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
    let { courseId, room, date, time } = req.body;

    if (courseId === "") {
        res.json({
            code: 0,
            message: "Tên khóa học không được bỏ trống",
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
    } else {
        let learningSchedule = new LearningSchedule();
        let course = await Course.findOne({ courseId });
        let learningScheduleId = v4UniqueId();

        learningSchedule.learningScheduleId = learningScheduleId;
        learningSchedule.courseId = courseId;
        learningSchedule.date = date;
        learningSchedule.room = room;
        learningSchedule.time = time;
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
                teacherName: course.courseTeacher,
            },
        });
    }
};

// Edit learning schedule
module.exports.editLearningSchedule = async (req, res) => {
    let { courseId, room, date, time } = req.body;
    let { id } = req.params;

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
    } else {
        let learningSchedule = await LearningSchedule.findOneAndUpdate(
            { learningScheduleId: id },
            {
                courseId,
                room,
                date,
                time,
            },
            { new: true }
        );
        let course = await Course.findOne({ courseId });

        res.json({
            code: 1,
            message: "Cập nhật lịch học thành công",
            data: {
                courseName: course.courseName,
                room,
                date,
                time,
                teacherName: course.courseTeacher,
            },
        });
    }
};

// Delete learning schedule
module.exports.deleteLearningSchedule = async (req, res) => {
    let { id } = req.params;
    let learningSchedule = await LearningSchedule.deleteOne({
        learningScheduleId: id,
    });

    res.json({
        code: 1,
        message: "Xóa lịch học thành công",
    });
};
