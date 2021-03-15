$(document).ready(() => {
    $("#addStudent").click(() => {
        $("#addStudentModal").modal("toggle");
    });

    $("#addStudentButton").click((event) => {
        event.preventDefault();
        fetch("/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: $("#studentFullname").val(),
                email: $("#studentEmail").val(),
                password: $("#studentPassword").val(),
                address: $("#studentAddress").val(),
                phone: $("#studentPhone").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addStudentFailed").text("");
                    $("#addStudentSuccess").text(result.message);

                    setTimeout(() => {
                        $("#studentFullname").val("");
                        $("#studentEmail").val("");
                        $("#studentPhone").val("");
                        $("#studentPassword").val("");
                        $("#studentAddress").val("");
                        $("#addStudentModal").modal("hide");
                        $("#addStudentSuccess").text("");

                        $("#studentsList").append(`
                            <tr id=${result.data.studentId}>
                                <td>${result.data.fullname}</td>
                                <td>${result.data.email}</td>
                                <td>${result.data.address}</td>
                                <td>${result.data.phone}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-primary editStudent" data-studentId=${result.data.studentId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteStudent" data-studentId=${result.data.studentId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addStudentSuccess").text("");
                    $("#addStudentFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
