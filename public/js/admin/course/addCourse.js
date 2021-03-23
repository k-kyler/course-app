$(document).ready(() => {
    $("#addCourse").click(() => {
        $("#addCourseModal").modal("toggle");
    });

    $("#addCourseButton").click((event) => {
        event.preventDefault();
        fetch("/course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseName: $("#courseName").val(),
                courseDescription: $("#courseDescription").val(),
                courseFee: $("#courseFee").val(),
                courseStart: $("#courseStart").val(),
                courseTeacher: $("#courseTeacher").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addCourseFailed").text("");
                    $("#addCourseSuccess").text(result.message);

                    setTimeout(() => {
                        $("#courseName").val("");
                        $("#courseDescription").val("");
                        $("#courseFee").val("");
                        $("#courseStart").val("");
                        $("#courseTeacher").val("");
                        $("#addCourseModal").modal("hide");
                        $("#addCourseSuccess").text("");

                        $("#coursesList").append(`
                            <tr id=${result.data.courseId}>
                                <td>${result.data.courseName}</td>
                                <td>${Intl.NumberFormat().format(
                                    result.data.courseFee
                                )}</td>
                                <td>${result.data.courseStart}</td>
                                <td>${result.data.courseTeacher}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-success viewCourse" data-courseId=${
                                        result.data.courseId
                                    }>Chi tiết</button>
                                    <button type="button" class="ml-2 btn btn-outline-primary editCourse" data-courseId=${
                                        result.data.courseId
                                    }>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteCourse" data-courseId=${
                                        result.data.courseId
                                    }>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addCourseSuccess").text("");
                    $("#addCourseFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
