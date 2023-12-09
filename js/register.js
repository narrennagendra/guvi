$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();
        var formData = {};
        $("#register-from :input").each(function () {
            formData[$(this).attr('name')] = $(this).val();
        });

        var {name, email, password} = {...formData};
        console.log(name, email, password);
        $.ajax({
            type: "POST",
            url: "http://localhost/guvi-project/php/register.php",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({name, email, password}),
            success: function (response) {
                window.location.href = "http://localhost/guvi-project/login.html";
            },
            error: function (error) {
                if(!error.message) {
                window.location.href = "http://localhost/guvi-project/login.html";
                } else {
                    alert("Error: " + error.message);
                }
            }
        });
    });
});