const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const LearningSchedule = require("../models/learningSchedule.model");
const Course = require("../models/course.model");

// Notification
module.exports.teacherNotification = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let notifications = await Notification.find();

    res.render("dashboards/teacher/notification", {
        user,
        notifications,
    });
};

// Schedule
module.exports.teacherSchedule = async (req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let learningSchedules = await LearningSchedule.find();
    let courses = await Course.find();
    let teacherLearningSchedules = [];

    for (let course of courses) {
        for (let learningSchedule of learningSchedules) {
            if (
                course.courseId === learningSchedule.courseId &&
                course.courseTeacher === user.fullname
            ) {
                teacherLearningSchedules.push({
                    courseName: course.courseName,
                    room: learningSchedule.room,
                    date: learningSchedule.date,
                    time: learningSchedule.time,
                });
            }
        }
    }

    res.render("dashboards/teacher/schedule", {
        user,
        teacherLearningSchedules,
    });
};
