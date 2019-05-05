
$(document).ready(function () {

    function connect(address, params) {
        $.ajax({
            type: "POST",
            url: "http://101.132.96.76:8080/"+address,
            dataType: "text",
            data: params,
            success: function (data) {
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    };

    //用户信息正确时，跳转到account页面，没写跳转
    $("#user_sign_in").click(function () {
        var params = {}
        params.phone_number = $('#phoneNumber_lo').val();
        params.password = $('#password_lo').val();
        connect("user/login", params)
    });

    $('#signup-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            phone_signup: {
                validators: {
                    notEmpty: {
                    },
                }
            },
            code_signup: {
                validators: {
                    notEmpty: {
                    },
                }
            },
            id_signup: {
                validators: {
                    notEmpty: {
                    },
                }
            },
            name_signup: {
                validators: {
                    notEmpty: {
                    },
                }
            },
            password_signup: {
                validators: {
                    notEmpty: {
                    },
                    identical: {
                        field: 'repassword_signup'
                    }
                }
            },
            repassword_signup: {
                validators: {
                    notEmpty: {
                    },
                    identical: {
                        field: 'password_signup'
                    }
                }
            }
        }
    });

    $("#user_sign_up").on("click", function () {
        var bootstrapValidator = $("#signup-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //验证id和姓名，手机号和验证码，提交注册

            var Params = {};
            Params.phone_number = $("#phoneNumber_re").val();
            Params.password = $("#userPassword_re").val();
            Params.id_number = $("#userId_re").val();
            Params.full_name = $("#userName_re").val();
            connect("user/register", Params);

            //如果成功
            $('#signup-form').data('bootstrapValidator').resetForm(true);
            $('#signup').modal("hide");
            $('.modal-backdrop').remove();
            $('#successModal').modal('show');

            // //未成功
            // $('#failModal').modal('show');
        }
        else return;
    });

    $('#signup .close').click(function () {
        $('#signup-form').data('bootstrapValidator').resetForm(true);
    });

    $('#bond-email-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            account_info_bond:{
                validators: {
                    notEmpty: {
                    }
                }
            },
            account_info_email: {
                validators: {
                    notEmpty: {
                    },
                    emailAddress: {
                    }
                }
            },
            account_info_code: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#email_submit").on("click", function () {
        var bootstrapValidator = $("#bond-email-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //邮箱和验证码确认
            
            //如果成功：
            $('#bond-email-form').data('bootstrapValidator').resetForm(true);
            $('#emailModal').modal("hide");
            $('.modal-backdrop').remove();
            $('#passwordModal_change').modal("show");
            
            // //不成功：
            // $('#failModal').modal('show');

        }
        else return;
    });

    $('#email_cancel').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
    });

    $('#password-new-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            password_change: {
                validators: {
                    notEmpty: {
                    },
                    identical:{
                        field: 'passpassword_change_confirmword',
                    }
                }
            },
            password_change_confirm: {
                validators: {
                    notEmpty: {
                    },
                    identical:{
                        field: 'password_change',
                    }
                }
            }
        }
    });

    $("#password-change-submit").on("click", function () {
        var bootstrapValidator = $("#password-new-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //提交新密码
            
            $('#password-new-form').data('bootstrapValidator').resetForm(true);
            $('#passwordModal_change').modal("hide");
            $('.modal-backdrop').remove();
            //如果提交成功
            $('#successModal').modal('show');

            // //未成功
            // $('#failModal').modal('show');
        }
        else return;
    });

    $('#password-change-cancel').click(function () {
        $('#password-new-form').data('bootstrapValidator').resetForm(true);
    });

    $('#emailModal .close').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
    });

    $('#passwordModal_change .close').click(function () {
        $('#password-new-form').data('bootstrapValidator').resetForm(true);
    });
});