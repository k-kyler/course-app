document.getElementById("resetButton").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("pwd").value = "";
    document.getElementById("cfpwd").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
});
