$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();
        var formData = {};
        $("#register-from :input").each(function () {
            formData[$(this).attr('name')] = $(this).val();
        });
        
        $.ajax({
            type: "POST",
            url: "http://localhost/guvi-project/php/register.php",
            contentType: "application/json; charset=utf-8",
            data: formData,
            success: function (response) {
                window.location.href = "http://localhost/guvi-project/login.html";
            },
            error: function (error) {
                console.log(error)
                alert("Error" + error.message);
            }
        });
    });
});