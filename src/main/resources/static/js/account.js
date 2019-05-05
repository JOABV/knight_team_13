$(document).ready(function () {

    function connect(address, params) {
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + address,
            dataType: "text",
            data: params,
            success: function (data) {
                alert("Saved")
            },
            error: function (jqXHR) {
                alert("it aleady exists")
            }
        });
    }

    $("#viewFileButton").click(function () {
        var text = $(this).text();
        if (text == "Hide") {
            $("#fileImage").hide();
            $(this).text("View File");
        } else if (text == "隐藏") {
            $("#fileImage").hide();
            $(this).text("查看文件");
        } else if (text == "View File") {
            $("#fileImage").show();
            $(this).text("Hide");
        } else if (text == "查看文件") {
            $("#fileImage").show();
            $(this).text("隐藏");
        }
    });

    if ($('#expired').css('display') === 'block') {
        $('#remove_when_expired').remove();
    };

    Tipped.create('.inline-bond', {
        position: 'bottom',
        fadeIn: 300,
        fadeOut: 200,
        padding: 0
    });

    $('.tooltip-account').tooltipster({
        animation: 'fade',
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        interactive: true,
        arrow: false,
    });

    $('.tooltip-email').tooltipster({
        animation: 'fade',
        delay: 200,
        side: 'right',
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        trigger: 'click',
        interactive: true
    });

    $('#tooltip_content_account a').click(function () {
        $('.tooltip-account').tooltipster('close');
    });

    $('#confirm-button').click(function () {
        $('.tooltip-email').tooltipster('close');
        $('#change-email').attr('disabled', true);
        $("#change-email").css('pointer-events', 'none');
        $('#change-email img').attr('src', '../static/resources/img/unlock.png');
        $('#account-info-email').attr('disabled', false);
        $('#change_email_code').css('display', 'block');
    });

    $('#emailModal_bonded').on('hidden.bs.modal', function () {
        $('#change-email').attr('disabled', false);
        $("#change-email").css('pointer-events', 'auto');
        $('#change-email img').attr('src', '../static/resources/img/lock.png');
        $('#account-info-email').attr('disabled', true);
        $('#change_email_code').css('display', 'none');
    });

    $('#claimForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputPolicyNo: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            inputName: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            inputID: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            inputTel: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            items: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            formPlace: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            formDate: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            formDetail: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#form_submit").on("click", function () {
        var bootstrapValidator = $("#claimForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //提交申诉表
        }
        else return;
    });

    $('#form_cancel').click(function () {
        $('#claimForm').data('bootstrapValidator').resetForm(true);
    });

    // 这块有点问题
    $('#cchange_password_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            passowrd_check_input: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#password-check-submit").on("click", function () {
        var bootstrapValidator = $("#change_password_form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //判定是否和密码一致
        }
        else return;
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
                    }
                }
            },
            password_change_confirm: {
                validators: {
                    notEmpty: {
                    }
                }
                // different or not
            }
        }
    });

    $("#password-change-submit").on("click", function () {
        var bootstrapValidator = $("#password-new-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //提交新密码
        }
        else return;
    });

    $('#password-change-cancel').click(function () {
        $('#password-new-form').data('bootstrapValidator').resetForm(true);
    });

    
    $('#bonded-email-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
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

    $("#email_bonded_submit").on("click", function () {
        var bootstrapValidator = $("#bonded-email-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //改变邮箱提交
        }
        else return;
    });

    $('#email_bonded_cancel').click(function () {
        $('#bonded-email-form').data('bootstrapValidator').resetForm(true);
    });


    $('#bond-email-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
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
            //绑定邮箱提交
        }
        else return;
    });

    $('#email_cancel').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
    });

    $('.close').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
        $('#bonded-email-form').data('bootstrapValidator').resetForm(true);
        $('#claimForm').data('bootstrapValidator').resetForm(true);
        $('#cchange_password_form').data('bootstrapValidator').resetForm(true);
        $('#password-new-form').data('bootstrapValidator').resetForm(true);
    });


    $("#customCheck5").click(function () {
        if ($("#customCheck5").is(':checked')) {
            $("#elseInput").show();
        }
        if (!$("#customCheck5").is(':checked')) {
            $("#elseInput").hide();
        }
    });
});