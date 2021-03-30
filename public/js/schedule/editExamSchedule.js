$(document).ready(() => {
    // Show edit exam schedule data
    $("body").on("click", ".editExamSchedule", (event) => {
        let examScheduleId = $(event.target).data("examscheduleid");

        event.preventDefault();
        $("#editExamScheduleButton").attr(
            "data-examScheduleId",
            examScheduleId
        );
        fetch(`/examschedule/${examScheduleId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editExamScheduleFailed").text("");
                    $("#editExamScheduleCourseId").val(result.data.courseId);
                    $("#editExamScheduleRoom").val(result.data.examRoom);
                    $("#editExamScheduleDate").val(result.data.examDate);
                    $("#editExamScheduleTime").val(result.data.examTime);

                    for (student of result.data.students) {
                        fetch(`/student/${student.studentId}`)
                            .then((response) => response.json())
                            .then((result) => {
                                if (result.code === 1) {
                                    $("#editExamScheduleStudentsList").append(`
                                        <div class="d-flex align-items-center" id="deleteEditStudentEC-${result.data.studentId}">
                                            <button data-studentECId="deleteEditStudentEC-${result.data.studentId}" type="button" class="btn btn-link text-danger deleteEditStudentECButton">
                                                <i data-studentECId="deleteEditStudentEC-${result.data.studentId}" class="fas fa-ban"></i>
                                            </button>
                                            <p id="studentEC-${result.data.studentId}" class="text-primary mb-0">${result.data.fullname}</p>
                                        </div>
                                    `);
                                }
                            })
                            .catch((error) => console.log(error));
                    }
                } else if (result.code === 0) {
                    $("#editExamScheduleCourseId").val("");
                    $("#editExamScheduleRoom").val("");
                    $("#editExamScheduleDate").val("");
                    $("#editExamScheduleTime").val("");
                    $("#editExamScheduleStudentsList").html("");
                    $("#editExamScheduleSuccess").text("");
                    $("#editExamScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editExamScheduleModal").modal("toggle");
    });

    // Add student to edit exam schedule
    $("body").on("click", "#editExamScheduleStudents", (event) => {
        let studentId = event.target.value;

        if (
            studentId &&
            !document.getElementById(`deleteEditStudentEC-${studentId}`)
        ) {
            $("#editExamScheduleFailed").html("");

            fetch(`/student/${studentId}`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.code === 1) {
                        $("#editExamScheduleStudentsList").append(`
                        <div class="d-flex align-items-center" id="deleteEditStudentEC-${studentId}">
                            <button data-studentECId="deleteEditStudentEC-${studentId}" type="button" class="btn btn-link text-danger deleteEditStudentECButton">
                                <i data-studentECId="deleteEditStudentEC-${studentId}" class="fas fa-ban"></i>
                            </button>
                            <p id="studentEC-${studentId}" class="text-primary mb-0">${result.data.fullname}</p>
                        </div>
                    `);
                    }
                })
                .catch((error) => console.log(error));
        } else if (
            studentId &&
            document.getElementById(`deleteEditStudentEC-${studentId}`)
        ) {
            $("#editExamScheduleFailed").html("Học viên đã có trong danh sách");
        }
    });

    // Remove student from edit exam schedule
    $("body").on("click", ".deleteEditStudentECButton", (event) => {
        event.preventDefault();

        let studentECId = event.target.dataset.studentecid;

        $("#editExamScheduleFailed").html("");
        $(`div#${studentECId}`).remove();
    });

    // Edit exam schedule handler
    $("body").on("click", "#editExamScheduleButton", (event) => {
        let examScheduleId = event.target.dataset.examscheduleid;

        event.preventDefault();

        let editExamScheduleStudentsList = [];

        $("#editExamScheduleStudentsList p").each((index, element) => {
            editExamScheduleStudentsList.push({
                studentId: element.id.split("studentEC-")[1],
            });
        });

        fetch(`/examschedule/edit/${examScheduleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: $("#editExamScheduleCourseId").val(),
                examRoom: $("#editExamScheduleRoom").val(),
                examDate: $("#editExamScheduleDate").val(),
                examTime: $("#editExamScheduleTime").val(),
                students: editExamScheduleStudentsList,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editExamScheduleFailed").text("");
                    $("#editExamScheduleSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editExamScheduleCourseId").val("");
                        $("#editExamScheduleRoom").val("");
                        $("#editExamScheduleDate").val("");
                        $("#editExamScheduleTime").val("");
                        $("#editExamScheduleStudentsList").html("");
                        $("#editExamScheduleModal").modal("hide");
                        $("#editExamScheduleSuccess").text("");
                        $(`tr#${examScheduleId} td:nth-child(1)`).html(
                            result.data.courseName
                        );
                        $(`tr#${examScheduleId} td:nth-child(2)`).html(
                            result.data.examRoom
                        );
                        $(`tr#${examScheduleId} td:nth-child(3)`).html(
                            result.data.examDate
                        );
                        $(`tr#${examScheduleId} td:nth-child(4)`).html(
                            result.data.examTime
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editExamScheduleSuccess").text("");
                    $("#editExamScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
