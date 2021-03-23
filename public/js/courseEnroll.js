$(document).ready(() => {
    // Remove duplicate button
    $("#coursesList .d-flex button:nth-child(2)").remove();

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
                        "Mô tả:<br>" + result.data.courseDescription
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

    // Confirm course enroll button
    $("body").on("click", "#courseEnrollButton", (event) => {
        let courseId = event.target.dataset.courseid;

        fetch(`/courseenroll/enroll/${courseId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $(`tr#${courseId} button`).attr(
                        "class",
                        "btn btn-outline-danger courseCancel"
                    );
                    $(`tr#${courseId} button`).html("Hủy");
                    $("#courseEnrollModal").modal("hide");
                }
            })
            .catch((error) => console.log(error));
    });

    // Cancel course
    $("body").on("click", ".courseCancel", (event) => {
        let courseId = event.target.dataset.courseid;

        fetch(`/courseenroll/cancel/${courseId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $(`tr#${courseId} button`).attr(
                        "class",
                        "btn btn-outline-success courseEnroll"
                    );
                    $(`tr#${courseId} button`).html("Đăng ký");
                }
            })
            .catch((error) => console.log(error));
    });
});
