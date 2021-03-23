$(document).ready(() => {
    // Show edit notification data
    $("body").on("click", ".editNotification", (event) => {
        let notificationId = $(event.target).data("notificationid");

        event.preventDefault();
        $("#editNotificationButton").attr(
            "data-notificationId",
            notificationId
        );
        fetch(`/notification/${notificationId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#editNotificationFailed").text("");
                    $("#editNotificationName").val(
                        result.data.notificationName
                    );
                    $("#editNotificationContent").val(
                        result.data.notificationContent
                    );
                } else if (result.code === 0) {
                    $("#editNotificationName").val("");
                    $("#editNotificationContent").val("");
                    $("#editNotificationSuccess").text("");
                    $("#editNotificationFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
        $("#editNotificationModal").modal("toggle");
    });

    // Edit notification handler
    $("body").on("click", "#editNotificationButton", (event) => {
        let notificationId = event.target.dataset.notificationid;

        event.preventDefault();
        fetch(`/notification/edit/${notificationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notificationName: $("#editNotificationName").val(),
                notificationContent: $("#editNotificationContent").val(),
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#editNotificationFailed").text("");
                    $("#editNotificationSuccess").text(result.message);
                    setTimeout(() => {
                        $("#editNotificationName").val("");
                        $("#editNotificationContent").val("");
                        $("#editNotificationModal").modal("hide");
                        $("#editNotificationSuccess").text("");
                        $(`tr#${notificationId} td:nth-child(1)`).html(
                            result.data.notificationName
                        );
                        $(`tr#${notificationId} td:nth-child(2)`).html(
                            result.data.timestamp
                        );
                    }, 1000);
                }

                // Failed result
                else if (result.code === 0) {
                    $("#editNotificationSuccess").text("");
                    $("#editNotificationFailed").text(result.message);
                }
            })
            .catch((error) => console.log(error));
    });
});
