$(document).ready(() => {
    // Show course enroll modal
    $("body").on("click", ".courseEnroll", (event) => {
        let courseId = $(event.target).data("courseid");

        event.preventDefault();
        $("#courseEnrollButton").attr("data-courseId", courseId);
        fetch(`/course/${courseId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#courseEnrollButton").attr("disabled", false);
                    $("#courseEnrollTitle").html(
                        "Khóa học " + result.data.courseName
                    );
                    $("#courseEnrollTeacher").html(
                        "Giảng viên: " + result.data.courseTeacher
                    );
                    $("#courseEnrollDescription").html(
                        "Mô tả: " + result.data.courseDescription
                    );
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1000);
            });
        $("#courseEnrollModal").modal("toggle");
    });

    // Course enroll processing
    $("body").on("click", "#courseEnrollButton", (event) => {
        let courseId = event.target.dataset.courseid;
    });
});
