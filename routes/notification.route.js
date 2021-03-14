const express = require("express");
const controller = require("../controllers/notification.controller");

let router = express.Router();

router.get("/:id", controller.getNotification);
router.post("/", controller.addNotification);
router.put("/edit/:id", controller.editNotification);
router.delete("/delete/:id", controller.deleteNotification);

module.exports = router;
