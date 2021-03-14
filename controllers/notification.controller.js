const Notification = require("../models/notification.model");
const { v4: v4UniqueId } = require("uuid");

// Get notification by id
module.exports.getNotification = async (req, res) => {
    let notification = await Notification.findOne({
        notificationId: req.params.id,
    });

    if (notification) {
        res.json({
            code: 1,
            data: notification,
        });
    } else if (!notification) {
        res.json({
            code: 0,
            message: "Thông báo không tồn tại",
        });
    }
};

// Add notification
module.exports.addNotification = async (req, res) => {
    let { notificationName, notificationContent } = req.body;

    if (notificationName === "") {
        res.json({
            code: 0,
            message: "Tên thông báo không được bỏ trống",
        });
    } else if (notificationContent === "") {
        res.json({
            code: 0,
            message: "Nội dung thông báo không được bỏ trống",
        });
    } else {
        let notification = new Notification();
        let notificationId = v4UniqueId();
        let timestamp =
            new Date().toLocaleTimeString() +
            ", " +
            new Date().toLocaleDateString();

        notification.notificationId = notificationId;
        notification.notificationName = notificationName;
        notification.notificationContent = notificationContent;
        notification.timestamp = timestamp;
        notification.save();

        res.json({
            code: 1,
            message: "Thêm thông báo thành công",
            data: {
                notificationId,
                notificationName,
                notificationContent,
                timestamp,
            },
        });
    }
};

// Edit notification
module.exports.editNotification = async (req, res) => {
    let { notificationName, notificationContent } = req.body;
    let { id } = req.params;
    let timestamp =
        "Đã cập nhật lúc " +
        new Date().toLocaleTimeString() +
        ", " +
        new Date().toLocaleDateString();

    if (notificationName === "") {
        res.json({
            code: 0,
            message: "Tên thông báo không được bỏ trống",
        });
    } else if (notificationContent === "") {
        res.json({
            code: 0,
            message: "Nội dung thông báo không được bỏ trống",
        });
    } else {
        let notification = await Notification.findOneAndUpdate(
            { notificationId: id },
            {
                notificationName,
                notificationContent,
                timestamp,
            },
            { new: true }
        );

        res.json({
            code: 1,
            message: "Cập nhật thông báo thành công",
            data: {
                timestamp,
                notificationName,
            },
        });
    }
};

module.exports.deleteNotification = async (req, res) => {
    let { id } = req.params;
    let notification = await Notification.deleteOne({ notificationId: id });

    res.json({
        code: 1,
        message: "Xóa thông báo thành công",
    });
};
