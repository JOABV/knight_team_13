$(document).ready(function () {
    function connect(address, params) {
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + address,
            dataType: "text",
            data: params,
            success: function (data) {
                window.location.href = '../html-en/employee.html';
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
        }
        else return;
    });



});