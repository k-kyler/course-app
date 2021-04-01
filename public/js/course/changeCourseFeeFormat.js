document.getElementById("courseFee").addEventListener("change", (event) => {
    let courseFee = Number(event.target.value.replace(/[^0-9.-]+/g, ""));

    // Convert course fee field to currency format
    document.getElementById("courseFee").value = Intl.NumberFormat().format(
        courseFee
    );
});
