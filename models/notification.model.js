const mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({
    notificationId: String,
    notificationName: String,
    notificationContent: String,
    timestamp: String,
});

let Notification = mongoose.model(
    "Notification",
    notificationSchema,
    "notifications"
);

module.exports = Notification;
