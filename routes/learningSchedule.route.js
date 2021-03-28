const express = require("express");
const controller = require("../controllers/learningSchedule.controller");

let router = express.Router();

router.get("/:id", controller.getLearningSchedule);
router.post("/", controller.addLearningSchedule);
router.put("/edit/:id", controller.editLearningSchedule);
router.delete("/delete/:id", controller.deleteLearningSchedule);

module.exports = router;
