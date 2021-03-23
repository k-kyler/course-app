$(document).ready(() => {
    $("#addTeacher").click(() => {
        $("#addTeacherModal").modal("toggle");
    });

    $("#addTeacherButton").click((event) => {
        event.preventDefault();
        fetch("/teacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: $("#fullname").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                address: $("#address").val(),
                description: $("#description").val(),
                phone: $("#phone").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addTeacherFailed").text("");
                    $("#addTeacherSuccess").text(result.message);

                    setTimeout(() => {
                        $("#fullname").val("");
                        $("#email").val("");
                        $("#phone").val("");
                        $("#password").val("");
                        $("#description").val("");
                        $("#address").val("");
                        $("#addTeacherModal").modal("hide");
                        $("#addTeacherSuccess").text("");

                        $("#teachersList").append(`
                            <tr id=${result.data.teacherId}>
                                <td>${result.data.fullname}</td>
                                <td>${result.data.email}</td>
                                <td>${result.data.address}</td>
                                <td>${result.data.phone}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-success viewTeacher" data-teacherId=${result.data.teacherId}>Chi tiết</button>
                                    <button type="button" class="ml-2 btn btn-outline-primary editTeacher" data-teacherId=${result.data.teacherId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteTeacher" data-teacherId=${result.data.teacherId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addTeacherSuccess").text("");
                    $("#addTeacherFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
