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

    // var
    // connect("user/personal_information/pi")




    //查看保单里的查看文件
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

    //当保单过期的时候，用户无法进行申诉
    //需要判断保单是否过期
    if ($('#expired').css('display') === 'block') {
        $('#remove_when_expired').remove();
    };

    //不重要
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
        $('#change_email_button').css('display', 'block');

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
            formFile: {
                validators: {
                    file: {
                    },
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
            //提交申诉

            //成功
            $('#formModal').fadeOut();
            $('.modal-backdrop').remove();
            $('#remove_when_expired').remove();
            $('#detail_claimdetail').css('display', 'block');
            $('#not_claim').remove();
            $('#made_claim').css('display', 'block');
            $('#successModal').modal('show');

            // //不成功
            // $('#failModal').modal('show');
        }
        else return;
    });

    $('#form_cancel').click(function () {
        $('#claimForm').data('bootstrapValidator').resetForm(true);
    });

    $('#change_password_form').bootstrapValidator({
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

            //如果一致：
            $('#change_password_form').data('bootstrapValidator').resetForm(true);
            $('#passwordModal_check').modal("hide");
            $('.modal-backdrop').remove();
            $('#passwordModal_change').modal("show");

            // //如果不一致
            // $('#failModal').modal('show');
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

            //成功
            $('#password-new-form').data('bootstrapValidator').resetForm(true);
            $('#passwordModal_change').modal("hide");
            $('.modal-backdrop').remove();
            $('#successModal').modal('show');

            // //不成功
            // $('#failModal').modal('show');

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
            //修改邮箱
            //验证邮箱和验证码

            //成功
            $('#successModal').modal('show');
            $('#bonded-email-form').data('bootstrapValidator').resetForm(true);
            $('#emailModal_bonded').modal("hide");
            $('.modal-backdrop').remove();

            // //不成功
            // $('#failModal').modal('show');
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
            //成功
            $('#successModal').modal('show');
            $('#bond-email-form').data('bootstrapValidator').resetForm(true);
            $('#emailModal').modal("hide");
            $('.modal-backdrop').remove();

            // //不成功
            // $('#failModal').modal('show');
        }
        else return;
    });

    $('#email_cancel').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
    });

    $('#emailModal .close').click(function () {
        $('#bond-email-form').data('bootstrapValidator').resetForm(true);
    });
    $('#emailModal_bonded .close').click(function () {
        $('#bonded-email-form').data('bootstrapValidator').resetForm(true);
    });
    $('#formModal .close').click(function () {
        $('#claimForm').data('bootstrapValidator').resetForm(true);
    });
    $('#passwordModal_check .close').click(function () {
        $('#change_password_form').data('bootstrapValidator').resetForm(true);
    });
    $('#passwordModal_change .close').click(function () {
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

    $('#processModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont2',
            clickAble: false,
            stepCounts:3,
            steps:['1','2','3'],
            showBtn:false,
            curStep:1,
        })

        //当需要改变process步骤的时候：
        $(".ystep-container").html('');
        var step2 = new SetStep({
            content: '.stepCont2',
            clickAble: false,
            stepCounts:3,
            steps:['1','2','3'],
            showBtn:false,
            curStep:2,//要直接在curStep里改
        })

        //根据步骤改变标题和内容
        var curstep = step2.opt.curStep;
        if(curstep == '1'){
            $('#to_process_title').css('display','block');

        }else if(curstep == '2'){
            $('#processing_title').css('display','block');
            
            //阶段一：正在找回：默认
            
            //阶段二：找回：寄行李
            $('#processing_1').css('display','none');
            $('#processing_2_1').css('display','block');
            
            //阶段二：未找回：索赔
            $('#processing_1').css('display','none');
            $('#processing_2_2').css('display','block');

        }else if(curstep == '3'){
            $('#processed_title').css('display','block');

            //第一种情况：直接被拒
            $('#processed_1').css('display','block');

            //第二种情况：行李寄出
            $('#processed_2_1').css('display','block');
            
            //第三种情况：汇款打出
            $('#processed_2_2').css('display','block');
            
        }
    });

    
    

    $('#processModal').on('hidden.bs.modal', function () {
        $(".ystep-container").html('')
    });

});