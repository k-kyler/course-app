const ExamSchedule = require("../models/examSchedule.model");
const Course = require("../models/course.model");
const { v4: v4UniqueId } = require("uuid");

// Get exam schedule by id
module.exports.getExamSchedule = async (req, res) => {
    let examSchedule = await ExamSchedule.findOne({
        examScheduleId: req.params.id,
    });
    let course = await Course.findOne({ courseId: examSchedule.courseId });

    if (examSchedule) {
        res.json({
            code: 1,
            data: examSchedule,
            courseName: course.courseName,
        });
    } else if (!examSchedule) {
        res.json({
            code: 0,
            message: "Lịch thi không tồn tại",
        });
    }
};

// Add exam schedule
module.exports.addExamSchedule = async (req, res) => {
    let { courseId, room, date, time } = req.body;

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

// Edit exam schedule
module.exports.editExamSchedule = async (req, res) => {
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

// Delete exam schedule
module.exports.deleteExamSchedule = async (req, res) => {
    let { id } = req.params;
    let learningSchedule = await LearningSchedule.deleteOne({
        learningScheduleId: id,
    });

    res.json({
        code: 1,
        message: "Xóa lịch học thành công",
    });
};
