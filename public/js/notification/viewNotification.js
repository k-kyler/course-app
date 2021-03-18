$(document).ready(() => {
    // Show view notification modal
    $("body").on("click", ".viewNotification", (event) => {
        let notificationId = $(event.target).data("notificationid");

        event.preventDefault();
        $("#viewNotificationButton").attr(
            "data-notificationId",
            notificationId
        );
        fetch(`/notification/${notificationId}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    $("#viewNotificationTitle").html(
                        result.data.notificationName
                    );
                    $("#viewNotificationContent").html(
                        "Nội dung: " + result.data.notificationContent
                    );
                }
            })
            .catch((error) => console.log(error));
        $("#viewNotificationModal").modal("toggle");
    });
});
