$(document).ready(function () {
    function connect(address, params) {
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + address,
            dataType: "text",
            data: params,
            success: function (data) {
                window.location.href = '../../templates/employee.html';
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    }

    $("#employee_login").click(function () {
        var params = {}
        params.username = $('#employee_lo').val()
        params.password = $('#password_em').val()
        connect("staff/login", params)
    });


});