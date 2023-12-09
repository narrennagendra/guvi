$(document).ready(function(){
    var token = localStorage.getItem("token");
    console.log(token, "foo");

    $.ajax({
        url: "http://localhost/guvi-project/php/profile.php",
        type: "GET",
        headers: {
            "AUTH_TOKEN": token
        },
        success: function(response){
            console.log(response);
            response.name ? $("#name").val(response.name): "";
            response.email ? $("#email").val(response.email): "";
            response.cnum ? $("#cnum").val(response.cnum): "";
            response.dob ? $("#dob").val(response.dob): "";
        },
        error: function(error){
            alert("Error: Cannot load the page")
        }
    });
});