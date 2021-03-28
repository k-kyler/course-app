$(document).ready(() => {
    // Show edit learning schedule data
    $("body").on("click", ".editLearningSchedule", (event) => {
        let learningScheduleId = $(event.target).data("learningscheduleid");

        event.preventDefault();
        $("#editLearningScheduleButton").attr(
            "data-learningScheduleId",
            learningScheduleId
        );
        fetch(`/learningschedule/${learningScheduleId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editLearningScheduleFailed").text("");
                    $("#editLearningScheduleCourseId").val(
                        result.data.courseId
                    );
                    $("#editLearningScheduleRoom").val(result.data.room);
                    $("#editLearningScheduleDate").val(result.data.date);
                    $("#editLearningScheduleTime").val(result.data.time);
                    $("#editLearningScheduleTeacherId").val(
                        result.data.teacherId
                    );
                } else if (result.code === 0) {
                    $("#editLearningScheduleCourseId").val("");
                    $("#editLearningScheduleRoom").val("");
                    $("#editLearningScheduleDate").val("");
                    $("#editLearningScheduleTime").val("");
                    $("#editLearningScheduleTeacherId").val("");
                    $("#editLearningScheduleSuccess").text("");
                    $("#editLearningScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editLearningScheduleModal").modal("toggle");
    });

    // Edit learning schedule handler
    $("body").on("click", "#editLearningScheduleButton", (event) => {
        let learningScheduleId = event.target.dataset.learningscheduleid;

        event.preventDefault();
        fetch(`/learningschedule/edit/${learningScheduleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: $("#editLearningScheduleCourseId").val(),
                room: $("#editLearningScheduleRoom").val(),
                date: $("#editLearningScheduleDate").val(),
                time: $("#editLearningScheduleTime").val(),
                teacherId: $("#editLearningScheduleTeacherId").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editLearningScheduleFailed").text("");
                    $("#editLearningScheduleSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editLearningScheduleCourseId").val("");
                        $("#editLearningScheduleRoom").val("");
                        $("#editLearningScheduleDate").val("");
                        $("#editLearningScheduleTime").val("");
                        $("#editLearningScheduleTeacherId").val("");
                        $("#editLearningScheduleModal").modal("hide");
                        $("#editLearningScheduleSuccess").text("");
                        $(`tr#${learningScheduleId} td:nth-child(1)`).html(
                            result.data.courseName
                        );
                        $(`tr#${learningScheduleId} td:nth-child(2)`).html(
                            result.data.room
                        );
                        $(`tr#${learningScheduleId} td:nth-child(3)`).html(
                            result.data.date
                        );
                        $(`tr#${learningScheduleId} td:nth-child(4)`).html(
                            result.data.time
                        );
                        $(`tr#${learningScheduleId} td:nth-child(5)`).html(
                            result.data.teacherName
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editLearningScheduleSuccess").text("");
                    $("#editLearningScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
