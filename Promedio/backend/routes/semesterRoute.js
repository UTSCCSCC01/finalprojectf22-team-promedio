const express = require("express");
const router = express.Router();

const SemesterController = require("../controllers/semesterController");

router.route("/user/:userId/semester/:semesterName")
    .get(SemesterController.getSemester)
    .patch(SemesterController.updateSemester)
    .delete(SemesterController.removeSemester)
    
router.route("/user/:userId/semester")
    .get(SemesterController.getAllSemesters)
    .post(SemesterController.createSemester)

module.exports = router;