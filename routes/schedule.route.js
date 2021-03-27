const express = require("express");
const controller = require("../controllers/schedule.controller");

let router = express.Router();

router.get("/:id", controller.getSchedule);
router.post("/", controller.addSchedule);
router.put("/edit/:id", controller.editSchedule);
router.delete("/delete/:id", controller.deleteSchedule);

module.exports = router;
