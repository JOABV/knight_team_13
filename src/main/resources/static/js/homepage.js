
$(document).ready(function () {

    // function connect(address, params) {
    // var url = "http://localhost:8080/";
    // // var url = "http://101.132.96.76:8080/";

    //设置cookie
    function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

    $('#signin-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            phone_signin: {
                validators: {
                    notEmpty: {
                    },
                }
            },
            password_signin: {
                validators: {
                    notEmpty: {
                    },
                }
            }
        }
    });

    //用户信息正确时，跳转到account页面，没写跳转
    $("#user_sign_in").click(function () {
        var params = {}
        params["phone_number"] = $('#phoneNumber_lo').val()
        params["password"] = $('#password_lo').val()
        console.log(params)
        $.ajax({
            type: "POST",
            url: url + "user/login",
            contentType: "application/json",
            dataType:"json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                if(data["Checkcode"] === "100") {
                    //如果成功
                    $('#signin-form').data('bootstrapValidator').resetForm(true);
                    $('#successModal').modal('show');
                    window.localStorage.setItem('user_phone_number', params["phone_number"]);
                    setCookie('user_phone_number',params["phone_number"],1); // cookie过期时间为1天。
                    window.location.href = url + "user/account"
                }else{
                    //未成功
                    $('#failModal').modal('show');
                }
            },
            error: function (jqXHR) {
                // return jqXHR.status.toString();
            }
        });
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
            var params = {};
            params["phone_number"] = $("#phoneNumber_re").val();
            params["password"] = $("#userPassword_re").val();
            params["id_number"] = $("#userId_re").val();
            params["full_name"] = $("#userName_re").val();
            console.log(params);
            $.ajax({
                type: "POST",
                url: url + "user/register",
                contentType: "application/json",
                dataType:"json",
                async: false,
                data: JSON.stringify(params),
                success: function (data) {
                    if(data["Checkcode"] === "100") {
                        //如果成功
                        $('#signup-form').data('bootstrapValidator').resetForm(true);
                        $('#signup').modal("hide");
                        $('.modal-backdrop').remove();
                        $('#successModal').modal('show');
                    }else{
                        //未成功
                        $('#failModal').modal('show');
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR.status.toString());
                }
            });
        }
    });

    $('#signup .close').click(function () {
        $('#signup-form').data('bootstrapValidator').resetForm(true);
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
                    identical: {
                        field: 'passpassword_change_confirmword',
                    }
                }
            },
            password_change_confirm: {
                validators: {
                    notEmpty: {
                    },
                    identical: {
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
            account_info_bond: {
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
                    identical: {
                        field: 'passpassword_change_confirmword',
                    }
                }
            },
            password_change_confirm: {
                validators: {
                    notEmpty: {
                    },
                    identical: {
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

    $('#guideModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont1',
            clickAble: true,
            stepCounts: 4,
            steps: ['1', '2', '3', '4'],
            showBtn: false,
            curStep: 1,
        })
    });
    $('#guideModal').on('hidden.bs.modal', function () {
        $(".ystep-container").html('')
    });

    $('#infoModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont2',
            clickAble: true,
            stepCounts: 3,
            steps: ['1', '2', '3'],
            showBtn: false,
            curStep: 1,
        })
    });
    $('#infoModal').on('hidden.bs.modal', function () {
        $(".ystep-container").html('')
    });


});