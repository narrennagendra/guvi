$(document).ready(function(){
    var token = localStorage.getItem("token");

    $.ajax({
        url: "your_api_url",
        type: "GET",
        headers: {
            "AUTH_TOKEN": token
        },
        success: function(response){
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