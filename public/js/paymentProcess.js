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
                        $("#paymentProcessStudentId").html(
                            `<p class="font-weight-bold mb-2">Mã thanh toán: <span class="text-success">${studentId}</span></p>`
                        );
                        $("#paymentProcessContent").html(
                            result.message +
                                "<a target='_blank' href='https://school-ibanking-app.herokuapp.com/'>Đến trang thanh toán</a>"
                        );
                    }, 800);
                } else if (result.code === 0) {
                    $("#paymentProcessContent").html(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#paymentProcessModal").modal("toggle");
    });
});
