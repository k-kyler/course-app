$(document).ready(() => {
    $("#addExamSchedule").click(() => {
        $("#addExamScheduleModal").modal("toggle");
    });

    $("#addExamScheduleButton").click((event) => {
        event.preventDefault();

        let examScheduleStudentsList = [];

        $("#examScheduleStudentsList p").each((index, element) => {
            examScheduleStudentsList.push({
                studentId: element.id.split("studentEC-")[1],
            });
        });

        $("#addExamScheduleFailed").html("");

        fetch("/examschedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: $("#examScheduleCourseId").val(),
                examRoom: $("#examScheduleRoom").val(),
                examDate: $("#examScheduleDate").val(),
                examTime: $("#examScheduleTime").val(),
                students: examScheduleStudentsList,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addLearningScheduleFailed").text("");
                    $("#addLearningScheduleSuccess").text(result.message);

                    setTimeout(() => {
                        $("#learningScheduleCourseId").val("");
                        $("#learningScheduleRoom").val("");
                        $("#learningScheduleDate").val("");
                        $("#learningScheduleTime").val("");
                        $("#addLearningScheduleModal").modal("hide");
                        $("#addLearningScheduleSuccess").text("");

                        $("#learningScheduleList").append(`
                            <tr id=${result.data.learningScheduleId}>
                                <td>${result.data.courseName}</td>
                                <td>${result.data.room}</td>
                                <td>${result.data.date}</td>
                                <td>${result.data.time}</td>
                                <td>${result.data.teacherName}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-primary editLearningSchedule" data-learningScheduleId=${result.data.learningScheduleId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteLearningSchedule" data-learningScheduleId=${result.data.learningScheduleId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addLearningScheduleSuccess").text("");
                    $("#addLearningScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
