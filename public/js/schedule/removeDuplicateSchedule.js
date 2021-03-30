$(document).ready(() => {
    let checkDuplicateLC = {};
    let checkDuplicateEC = {};
    let checkDuplicateLCTeacher = {};

    $("#studentLearningScheduleList tr").each(function () {
        let item = $(this).text();

        if (checkDuplicateLC[item]) {
            $(this).remove();
        } else {
            checkDuplicateLC[item] = true;
        }
    });

    $("#studentExamScheduleList tr").each(function () {
        let item = $(this).text();

        if (checkDuplicateEC[item]) {
            $(this).remove();
        } else {
            checkDuplicateEC[item] = true;
        }
    });

    $("#teacherLearningScheduleList tr").each(function () {
        let item = $(this).text();

        if (checkDuplicateLCTeacher[item]) {
            $(this).remove();
        } else {
            checkDuplicateLCTeacher[item] = true;
        }
    });
});
