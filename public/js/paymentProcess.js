$(document).ready(() => {
    // Show payment process modal
    $("body").on("click", ".paymentProcess", (event) => {
        let studentId = event.target.dataset.studentid;
        let coursesArray = event.target.dataset.coursesarray;
        let tuitionFee = $("#tuitionFee").val();

        event.preventDefault();
        fetch(`/payment/${studentId}/${tuitionFee}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                coursesArray,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    setTimeout(() => {
                        $("#paymentProcessStudentId").html(studentId);
                        $("#paymentProcessContent").html(
                            result.message +
                                "<a href='#'>Đến trang thanh toán</a>"
                        );
                    }, 800);
                }
            })
            .catch((error) => console.log(error));
        $("#paymentProcessModal").modal("toggle");
    });
});
