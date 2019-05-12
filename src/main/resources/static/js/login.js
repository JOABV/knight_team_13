$(document).ready(function () {
    var url = "http://localhost:8080/";
    // var url = "http://101.132.96.76:8080/"

    function connect(address, params) {
        $.ajax({
            type: "POST",
            url: url + address,
            contentType: "application/json",
            dataType:"json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                employee_homepage(data);
            },
            error: function (jqXHR) {
                // return jqXHR.status.toString();
            }
        });
    }

    function employee_homepage(data){
        if(data["Checkcode"] === "100") {
            window.location.href = url + "staff/employee";
        }else{
            alert(data["Checkcode"])
        }
    }

    $('.login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            employee_name: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            employee_password: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#employee_login").on("click", function () {
        var bootstrapValidator = $(".login-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //登录
            var params = {};
            params["phone_number"] = $('#employee_lo').val();
            params["password"] = $('#password_em').val();
            connect("staff/login", params);
        }else{
            //登陆失败
            $('#failModal').modal('show');
        }
    });



});