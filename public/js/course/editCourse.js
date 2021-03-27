$(document).ready(() => {
    // Show edit course data
    $("body").on("click", ".editCourse", (event) => {
        let courseId = $(event.target).data("courseid");

        event.preventDefault();
        $("#editCourseButton").attr("data-courseId", courseId);
        fetch(`/course/${courseId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editCourseFailed").text("");
                    $("#editCourseName").val(result.data.courseName);
                    $("#editCourseDescription").val(
                        result.data.courseDescription
                    );
                    $("#editCourseFee").val(result.data.courseFee);
                    $("#editCourseStart").val(result.data.courseStart);
                    $("#editCourseTeacher").val(result.data.courseTeacher);
                } else if (result.code === 0) {
                    $("#editCourseName").val("");
                    $("#editCourseDescription").val("");
                    $("#editCourseFee").val("");
                    $("#editCourseStart").val("");
                    $("#editCourseTeacher").val("");
                    $("#editCourseSuccess").text("");
                    $("#editCourseFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editCourseModal").modal("toggle");
    });

    // Edit course handler
    $("body").on("click", "#editCourseButton", (event) => {
        let courseId = event.target.dataset.courseid;

        event.preventDefault();
        fetch(`/course/edit/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseName: $("#editCourseName").val(),
                courseDescription: $("#editCourseDescription").val(),
                courseFee: $("#editCourseFee").val(),
                courseStart: $("#editCourseStart").val(),
                courseTeacher: $("#editCourseTeacher").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editCourseFailed").text("");
                    $("#editCourseSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editCourseName").val("");
                        $("#editCourseDescription").val("");
                        $("#editCourseFee").val("");
                        $("#editCourseStart").val("");
                        $("#editCourseTeacher").val("");
                        $("#editCourseModal").modal("hide");
                        $("#editCourseSuccess").text("");
                        $(`tr#${courseId} td:nth-child(1)`).html(
                            result.data.courseName
                        );
                        $(`tr#${courseId} td:nth-child(2)`).html(
                            Intl.NumberFormat().format(result.data.courseFee)
                        );
                        $(`tr#${courseId} td:nth-child(3)`).html(
                            result.data.courseStart
                        );
                        $(`tr#${courseId} td:nth-child(4)`).html(
                            result.data.courseTeacher
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editCourseSuccess").text("");
                    $("#editCourseFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
