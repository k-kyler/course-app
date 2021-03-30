$(document).ready(() => {
    // Show view exam schedule modal
    $("body").on("click", ".viewExamSchedule", (event) => {
        let examScheduleId = event.target.dataset.examscheduleid;

        event.preventDefault();

        fetch(`/examschedule/${examScheduleId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    let studentNames = result.studentNames;
                    let studentsList = "";

                    for (let student of studentNames) {
                        studentsList += `
                           <li>${student}</li>
                        `;
                    }

                    $("#viewExamScheduleTitle").html(
                        "Lịch thi " + result.courseName
                    );
                    $("#viewExamScheduleStudentsList").html(studentsList);
                }
            })
            .catch((error) => console.log(error));
        $("#viewExamScheduleModal").modal("toggle");
    });
});
