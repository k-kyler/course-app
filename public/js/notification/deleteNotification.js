$(document).ready(() => {
    // Show delete notification modal
    $("body").on("click", ".deleteNotification", (event) => {
        let notificationId = $(event.target).data("notificationid");

        event.preventDefault();
        $("#deleteNotificationButton").attr(
            "data-notificationId",
            notificationId
        );
        fetch(`/notification/${notificationId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#deleteNotificationTitle").html(
                        "Xóa thông báo " + result.data.notificationName + "?"
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#deleteNotificationModal").modal("toggle");
    });

    // Delete notification handler
    $("body").on("click", "#deleteNotificationButton", (event) => {
        let notificationId = $(event.target).data("notificationid");

        event.preventDefault();
        fetch(`/notification/delete/${notificationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // Success result
                if (result.code === 1) {
                    $("#deleteNotificationSuccess").text(result.message);
                    setTimeout(() => {
                        $("#deleteNotificationModal").modal("hide");
                        $(`tr#${notificationId}`).remove();
                    }, 1000);
                }
            })
            .catch((error) => console.log(error));
    });
});
