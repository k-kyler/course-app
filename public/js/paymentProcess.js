$(document).ready(() => {
    // Show payment process modal
    $("body").on("click", ".paymentProcess", (event) => {
        let studentId = event.target.dataset.studentid;

        event.preventDefault();
        fetch(`/payment/${studentId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                tuitionFee: $("#tuitionFee").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    setTimeout(() => {
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
