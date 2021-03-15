$(document).ready(() => {
    // Show edit teacher data
    $("body").on("click", ".editTeacher", (event) => {
        let teacherId = $(event.target).data("teacherid");

        event.preventDefault();
        $("#editTeacherButton").attr("data-teacherId", teacherId);
        fetch(`/teacher/${teacherId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editTeacherFailed").text("");
                    $("#editFullname").val(result.data.fullname);
                    $("#editEmail").val(result.data.email);
                    $("#editPhone").val(result.data.phone);
                    $("#editAddress").val(result.data.address);
                    $("#editDescription").val(result.data.description);
                } else if (result.code === 0) {
                    $("#editFullname").val("");
                    $("#editEmail").val("");
                    $("#editPhone").val("");
                    $("#editEmail").val("");
                    $("#editPassword").val("");
                    $("#editAddress").val("");
                    $("#editTeacherSuccess").text("");
                    $("#editTeacherFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editTeacherModal").modal("toggle");
    });

    // Edit teacher handler
    $("body").on("click", "#editTeacherButton", (event) => {
        let teacherId = $(event.target).data("teacherid");

        event.preventDefault();
        fetch(`/teacher/edit/${teacherId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: $("#editFullname").val(),
                email: $("#editEmail").val(),
                password: $("#editPassword").val(),
                phone: $("#editPhone").val(),
                address: $("#editAddress").val(),
                description: $("#editDescription").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editTeacherFailed").text("");
                    $("#editTeacherSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editFullname").val("");
                        $("#editEmail").val("");
                        $("#editPhone").val("");
                        $("#editAddress").val("");
                        $("#editPassword").val("");
                        $("#editDescription").val("");
                        $("#editTeacherModal").modal("hide");
                        $("#editTeacherSuccess").text("");
                        $(`tr#${teacherId} td:nth-child(1)`).html(
                            result.data.fullname
                        );
                        $(`tr#${teacherId} td:nth-child(2)`).html(
                            result.data.email
                        );
                        $(`tr#${teacherId} td:nth-child(3)`).html(
                            result.data.address
                        );
                        $(`tr#${teacherId} td:nth-child(4)`).html(
                            result.data.phone
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editTeacherSuccess").text("");
                    $("#editTeacherFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
