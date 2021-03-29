$(document).ready(() => {
    // Add student to exam schedule
    $("body").on("click", "#examScheduleStudents", (event) => {
        let studentId = event.target.value;

        if (
            studentId &&
            !document.getElementById(`deleteStudentEC-${studentId}`)
        ) {
            $("#addExamScheduleFailed").html("");

            fetch(`/student/${studentId}`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.code === 1) {
                        $("#examScheduleStudentsList").append(`
                        <div class="d-flex align-items-center" id="deleteStudentEC-${studentId}">
                            <button data-studentECId="deleteStudentEC-${studentId}" type="button" class="btn btn-link text-danger deleteStudentECButton">
                                <i data-studentECId="deleteStudentEC-${studentId}" class="fas fa-ban"></i>
                            </button>
                            <p id="studentEC-${studentId}" class="studentECName text-primary mb-0">${result.data.fullname}</p>
                        </div>
                    `);
                    }
                })
                .catch((error) => console.log(error));
        } else {
            $("#addExamScheduleFailed").html("Học viên đã có trong danh sách");
        }
    });

    // Remove student from exam schedule
    $("body").on("click", ".deleteStudentECButton", (event) => {
        event.preventDefault();

        let studentECId = event.target.dataset.studentecid;

        $(`div#${studentECId}`).remove();
    });
});
