$(document).ready(function(){
    $("#loginbtn").click(function(event){
        event.preventDefault();
        var email = $("#inpEmail").val();
        var password = $("#inpPassword").val();

        $.ajax({
            url: "http://localhost/guvi-project/php/login.php",
            type: "POST",
            data: JSON.stringify({email: email, password: password}),
            success: function(response){
                console.log(response);
                var token = response.token;
                localStorage.setItem("token", token);
                window.location.href = "http://localhost/guvi-project/index.html";
            },
            error: function(error){
                console.log(error);
                alert("Login failed:", error.message);
            }
        });
    });
});