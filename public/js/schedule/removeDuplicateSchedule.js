$(document).ready(() => {
    let checkDuplicateLC = {};
    let checkDuplicateEC = {};

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
});
