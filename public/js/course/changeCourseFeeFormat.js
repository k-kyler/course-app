document.getElementById("courseFee").addEventListener("change", (event) => {
    // Convert course fee field to currency format
    document.getElementById("courseFee").value = Intl.NumberFormat().format(
        document.getElementById("courseFee").value
    );
});
