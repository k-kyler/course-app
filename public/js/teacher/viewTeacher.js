$(document).ready(() => {
    // Show view notification modal
    $("body").on("click", ".viewTeacher", (event) => {
        let teacherId = $(event.target).data("teacherid");

        event.preventDefault();
        $("#viewTeacherButton").attr("data-teacherId", teacherId);
        fetch(`/teacher/${teacherId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#viewTeacherTitle").html(
                        "Giảng viên " + result.data.fullname
                    );
                    $("#viewDescriptionContent").html(result.data.description);
                }
            })
            .catch((error) => console.log(error));
        $("#viewTeacherModal").modal("toggle");
    });
});
