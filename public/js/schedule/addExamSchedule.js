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
                    $("#addExamScheduleFailed").text("");
                    $("#addExamScheduleSuccess").text(result.message);

                    setTimeout(() => {
                        $("#examScheduleCourseId").val("");
                        $("#examScheduleRoom").val("");
                        $("#examScheduleDate").val("");
                        $("#examScheduleTime").val("");
                        $("#examScheduleStudents").val("");
                        $("#examScheduleStudentsList").html("");
                        $("#addExamScheduleModal").modal("hide");
                        $("#addExamScheduleSuccess").text("");

                        $("#examScheduleList").append(`
                            <tr id=${result.data.examScheduleId}>
                                <td>${result.data.courseName}</td>
                                <td>${result.data.examRoom}</td>
                                <td>${result.data.examDate}</td>
                                <td>${result.data.examTime}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-success viewExamSchedule" data-examScheduleId=${result.data.examScheduleId}>Chi tiết</button>
                                    <button type="button" class="ml-2 btn btn-outline-primary editExamSchedule" data-examScheduleId=${result.data.examScheduleId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteExamSchedule" data-examScheduleId=${result.data.examScheduleId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addExamScheduleSuccess").text("");
                    $("#addExamScheduleFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
