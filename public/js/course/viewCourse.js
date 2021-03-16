$(document).ready(() => {
    // Show view course modal
    $("body").on("click", ".viewCourse", (event) => {
        let courseId = $(event.target).data("courseid");

        event.preventDefault();
        $("#viewCourseButton").attr("data-courseId", courseId);
        fetch(`/course/${courseId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#viewCourseTitle").html(
                        "Khóa học " + result.data.courseName
                    );
                    $("#viewCourseDescriptionContent").html(
                        result.data.courseDescription
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#viewCourseModal").modal("toggle");
    });
});
