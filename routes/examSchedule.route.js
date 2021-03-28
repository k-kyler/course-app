const express = require("express");
const controller = require("../controllers/examSchedule.controller");

let router = express.Router();

router.get("/:id", controller.getExamSchedule);
router.post("/", controller.addExamSchedule);
router.put("/edit/:id", controller.editExamSchedule);
router.delete("/delete/:id", controller.deleteExamSchedule);

module.exports = router;
