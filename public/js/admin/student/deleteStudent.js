$(document).ready(() => {
    // Show delete student modal
    $("body").on("click", ".deleteStudent", (event) => {
        let studentId = $(event.target).data("studentid");

        event.preventDefault();
        $("#deleteStudentButton").attr("data-studentId", studentId);
        fetch(`/student/${studentId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteStudentTitle").html(
                        "Xóa học viên " + result.data.fullname + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteStudentModal").modal("toggle");
    });

    // Delete student handler
    $("body").on("click", "#deleteStudentButton", (event) => {
        let studentId = event.target.dataset.studentid;

        event.preventDefault();
        fetch(`/student/delete/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteStudentSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteStudentModal").modal("hide");
                        $(`tr#${studentId}`).remove();
                        $("#deleteStudentSuccess").text("");
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
