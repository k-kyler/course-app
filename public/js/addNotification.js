$(document).ready(() => {
    $("#addNotification").click(() => {
        $("#addNotificationModal").modal("toggle");
    });

    $("#addNotificationButton").click((event) => {
        event.preventDefault();
        fetch("/notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notificationName: $("#notificationName").val(),
                notificationContent: $("#notificationContent").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#addNotificationFailed").text("");
                    $("#addNotificationSuccess").text(result.message);

                    setTimeout(() => {
                        $("#notificationName").val("");
                        $("#notificationContent").val("");
                        $("#addNotificationModal").modal("hide");
                        $("#addNotificationSuccess").text("");

                        $("#notificationsList").append(`
                            <tr id=${result.data.notificationId}>
                                <td>${result.data.notificationName}</td>
                                <td>${result.data.timestamp}</td>
                                <td class="d-flex">
                                    <button type="button" class="btn btn-outline-primary editNotification" data-notificationId=${result.data.notificationId}>Cập nhật</button>
                                    <button type="button" class="ml-2 btn btn-outline-danger deleteNotification" data-notificationId=${result.data.notificationId}>Xóa</button>
                                </td>
                            </tr>
                        `);
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#addNotificationSuccess").text("");
                    $("#addNotificationFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
