$(document).ready(() => {
    // Show payment history courses modal
    $("body").on("click", ".viewPaymentHistoryCourses", (event) => {
        let invoiceId = event.target.dataset.invoiceid;

        event.preventDefault();
        fetch(`/paymenthistorycourses/${invoiceId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    setTimeout(() => {
                        $("#paymentHistoryCoursesLoading p").remove();
                        for (let course of result.data) {
                            $("#paymentHistoryCoursesList").append(
                                `<li>${course.courseName}</li>`
                            );
                        }
                    }, 800);
                    $("#paymentHistoryCoursesList li").remove();

                    let pElement = document.createElement("p");

                    pElement.innerHTML = "Đang tải dữ liệu môn học...";
                    $("#paymentHistoryCoursesLoading").append(pElement);
                }
            })
            .catch((error) => console.log(error));
        $("#paymentHistoryCoursesModal").modal("toggle");
    });
});
