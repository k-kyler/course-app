$(document).ready(() => {
    // Show delete course modal
    $("body").on("click", ".deleteCourse", (event) => {
        let courseId = $(event.target).data("courseid");

        event.preventDefault();
        $("#deleteCourseButton").attr("data-courseId", courseId);
        fetch(`/course/${courseId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteCourseTitle").html(
                        "Xóa khóa học " + result.data.courseName + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteCourseModal").modal("toggle");
    });

    // Delete course handler
    $("body").on("click", "#deleteCourseButton", (event) => {
        let courseId = event.target.dataset.courseid;

        event.preventDefault();
        fetch(`/course/delete/${courseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteCourseSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteCourseModal").modal("hide");
                        $(`tr#${courseId}`).remove();
                        $("#deleteCourseSuccess").text("");
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
