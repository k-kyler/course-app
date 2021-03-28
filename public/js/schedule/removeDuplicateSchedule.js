$(document).ready(() => {
    let checkDuplicate = {};

    $("#studentLearningScheduleList tr").each(function () {
        let item = $(this).text();

        if (checkDuplicate[item]) {
            $(this).remove();
        } else {
            checkDuplicate[item] = true;
        }
    });
});
