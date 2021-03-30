const ExamSchedule = require("../models/examSchedule.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const { v4: v4UniqueId } = require("uuid");

// Get exam schedule by id
module.exports.getExamSchedule = async (req, res) => {
    let examSchedule = await ExamSchedule.findOne({
        examScheduleId: req.params.id,
    });
    let course = await Course.findOne({ courseId: examSchedule.courseId });
    let studentNames = [];

    for (let student of examSchedule.students) {
        let user = await User.findOne({ studentId: student.studentId });

        studentNames.push(user.fullname);
    }

    if (examSchedule) {
        res.json({
            code: 1,
            data: examSchedule,
            courseName: course.courseName,
            studentNames,
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
    let { courseId, examRoom, examDate, examTime, students } = req.body;

    if (courseId === "") {
        res.json({
            code: 0,
            message: "Tên khóa học không được bỏ trống",
        });
    } else if (examRoom === "") {
        res.json({
            code: 0,
            message: "Phòng thi không được bỏ trống",
        });
    } else if (examDate === "") {
        res.json({
            code: 0,
            message: "Ngày thi không được bỏ trống",
        });
    } else if (examTime === "") {
        res.json({
            code: 0,
            message: "Thời gian không được bỏ trống",
        });
    } else if (students.length === 0) {
        res.json({
            code: 0,
            message: "Không có danh sách học viên dự thi",
        });
    } else {
        let examSchedule = new ExamSchedule();
        let course = await Course.findOne({ courseId });
        let examScheduleId = v4UniqueId();

        examSchedule.examScheduleId = examScheduleId;
        examSchedule.courseId = courseId;
        examSchedule.examDate = examDate;
        examSchedule.examRoom = examRoom;
        examSchedule.examTime = examTime;
        examSchedule.students = students;
        examSchedule.save();

        res.json({
            code: 1,
            message: "Thêm lịch thi thành công",
            data: {
                examScheduleId,
                courseName: course.courseName,
                examDate,
                examTime,
                examRoom,
            },
        });
    }
};

// Edit exam schedule
module.exports.editExamSchedule = async (req, res) => {
    let { courseId, examRoom, examDate, examTime, students } = req.body;
    let { id } = req.params;

    if (courseId === "") {
        res.json({
            code: 0,
            message: "Tên lịch thi không được bỏ trống",
        });
    } else if (examRoom === "") {
        res.json({
            code: 0,
            message: "Phòng thi không được bỏ trống",
        });
    } else if (examDate === "") {
        res.json({
            code: 0,
            message: "Ngày thi không được bỏ trống",
        });
    } else if (examTime === "") {
        res.json({
            code: 0,
            message: "Thời gian không được bỏ trống",
        });
    } else if (students.length === 0) {
        res.json({
            code: 0,
            message: "Không có danh sách học viên dự thi",
        });
    } else {
        let examSchedule = await ExamSchedule.findOneAndUpdate(
            { examScheduleId: id },
            {
                courseId,
                examRoom,
                examDate,
                examTime,
                students,
            },
            { new: true }
        );
        let course = await Course.findOne({ courseId });

        res.json({
            code: 1,
            message: "Cập nhật lịch thi thành công",
            data: {
                courseName: course.courseName,
                examRoom,
                examDate,
                examTime,
            },
        });
    }
};

// Delete exam schedule
module.exports.deleteExamSchedule = async (req, res) => {
    let { id } = req.params;
    let examSchedule = await ExamSchedule.deleteOne({
        examScheduleId: id,
    });

    res.json({
        code: 1,
        message: "Xóa lịch thi thành công",
    });
};
