// Convert course fee field to currency format
document.getElementById("courseFee").value = Intl.NumberFormat().format(
    courseFee
);

document.getElementById("courseFee").addEventListener("change", (event) => {
    let courseFee = Number(event.target.value.replace(/[^0-9.-]+/g, ""));

    document.getElementById("courseFee").value = Intl.NumberFormat().format(
        courseFee
    );
});

// Convert edit course fee field to currency format
document.getElementById("editCourseFee").value = Intl.NumberFormat().format(
    editCourseFee
);

document.getElementById("editCourseFee").addEventListener("change", (event) => {
    let editCourseFee = Number(event.target.value.replace(/[^0-9.-]+/g, ""));

    document.getElementById("editCourseFee").value = Intl.NumberFormat().format(
        editCourseFee
    );
});
