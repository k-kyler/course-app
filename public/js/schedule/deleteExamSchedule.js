$(document).ready(() => {
    // Show delete exam schedule modal
    $("body").on("click", ".deleteExamSchedule", (event) => {
        let examScheduleId = $(event.target).data("examscheduleid");

        event.preventDefault();
        $("#deleteExamScheduleButton").attr(
            "data-examScheduleId",
            examScheduleId
        );
        fetch(`/examschedule/${examScheduleId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteExamScheduleTitle").html(
                        "Xóa lịch thi " + result.courseName + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteExamScheduleModal").modal("toggle");
    });

    // Delete exam schedule handler
    $("body").on("click", "#deleteExamScheduleButton", (event) => {
        let examScheduleId = event.target.dataset.examscheduleid;

        event.preventDefault();
        fetch(`/examschedule/delete/${examScheduleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteExamScheduleSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteExamScheduleModal").modal("hide");
                        $(`tr#${examScheduleId}`).remove();
                        $("#deleteExamScheduleSuccess").text("");
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
