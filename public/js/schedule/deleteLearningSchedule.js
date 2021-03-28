$(document).ready(() => {
    // Show delete learning schedule modal
    $("body").on("click", ".deleteLearningSchedule", (event) => {
        let learningSchedule = $(event.target).data("learningscheduleid");

        event.preventDefault();
        $("#deleteLearningScheduleButton").attr(
            "data-learningScheduleId",
            learningSchedule
        );
        fetch(`/learningschedule/${learningSchedule}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteLearningScheduleTitle").html(
                        "Xóa lịch học " + result.courseName + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteLearningScheduleModal").modal("toggle");
    });

    // Delete learning schedule handler
    $("body").on("click", "#deleteLearningScheduleButton", (event) => {
        let learningScheduleId = event.target.dataset.learningscheduleid;

        event.preventDefault();
        fetch(`/learningschedule/delete/${learningScheduleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteLearningScheduleSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteLearningScheduleModal").modal("hide");
                        $(`tr#${learningScheduleId}`).remove();
                        $("#deleteLearningScheduleSuccess").text("");
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
