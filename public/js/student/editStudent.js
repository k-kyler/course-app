$(document).ready(() => {
    // Show edit student data
    $("body").on("click", ".editStudent", (event) => {
        let studentId = $(event.target).data("studentid");

        event.preventDefault();
        $("#editStudentButton").attr("data-studentId", studentId);
        fetch(`/student/${studentId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editStudentFailed").text("");
                    $("#editStudentFullname").val(result.data.fullname);
                    $("#editStudentEmail").val(result.data.email);
                    $("#editStudentPhone").val(result.data.phone);
                    $("#editStudentAddress").val(result.data.address);
                } else if (result.code === 0) {
                    $("#editStudentFullname").val("");
                    $("#editStudentEmail").val("");
                    $("#editStudentPhone").val("");
                    $("#editStudentPassword").val("");
                    $("#editStudentAddress").val("");
                    $("#editStudentSuccess").text("");
                    $("#editStudentFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editStudentModal").modal("toggle");
    });

    // Edit student handler
    $("body").on("click", "#editStudentButton", (event) => {
        let studentId = event.target.dataset.studentid;

        event.preventDefault();
        fetch(`/student/edit/${studentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: $("#editStudentFullname").val(),
                email: $("#editStudentEmail").val(),
                password: $("#editStudentPassword").val(),
                phone: $("#editStudentPhone").val(),
                address: $("#editStudentAddress").val(),
                description: $("#editDescription").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editStudentFailed").text("");
                    $("#editStudentSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editStudentFullname").val("");
                        $("#editStudentEmail").val("");
                        $("#editStudentPhone").val("");
                        $("#editStudentAddress").val("");
                        $("#editStudentPassword").val("");
                        $("#editStudentModal").modal("hide");
                        $("#editStudentSuccess").text("");
                        $(`tr#${studentId} td:nth-child(1)`).html(
                            result.data.fullname
                        );
                        $(`tr#${studentId} td:nth-child(2)`).html(
                            result.data.email
                        );
                        $(`tr#${studentId} td:nth-child(3)`).html(
                            result.data.address
                        );
                        $(`tr#${studentId} td:nth-child(4)`).html(
                            result.data.phone
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editStudentSuccess").text("");
                    $("#editStudentFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
