$(document).ready(() => {
    // Show delete notification modal
    $("body").on("click", ".deleteTeacher", (event) => {
        let teacherId = $(event.target).data("teacherid");

        event.preventDefault();
        $("#deleteTeacherButton").attr("data-teacherId", teacherId);
        fetch(`/teacher/${teacherId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteTeacherTitle").html(
                        "Xóa giảng viên " + result.data.fullname + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteTeacherModal").modal("toggle");
    });

    // Delete notification handler
    $("body").on("click", "#deleteTeacherButton", (event) => {
        let teacherId = event.target.dataset.teacherid;

        event.preventDefault();
        fetch(`/teacher/delete/${teacherId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteTeacherSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteTeacherModal").modal("hide");
                        $(`tr#${teacherId}`).remove();
                        $("#deleteTeacherSuccess").text("");
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
