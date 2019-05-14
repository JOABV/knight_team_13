$(document).ready(function () {
    var url = "http://localhost:8080/";
    // var url = "http://101.132.96.76:8080/";
    // console.log(window.localStorage.getItem("policies"))
    if(window.localStorage.getItem("policies") !== null)
        information();

    function information() {
        $("#policy_list").empty()
        var pn = JSON.parse(window.localStorage.getItem("policies"));
        // console.log(pn)
        for(var i = 0 ; i < pn.length; i++){
            var list = JSON.parse(window.localStorage.getItem(pn[i]));
            var rowTr = document.createElement("tr");
            var states = list["states"].split("@@");
            var language = $("#")
            if(states[0] === "0"){
                rowTr.innerHTML =
                    "<th scope='row'>" + list["policy_number"] + "</th>" +
                    "<td>" + list["policy_name"] + "</td>" +
                    "<td>" + list["time"] + "</td>" +
                    "<td>" +
                    "<div id='not_claim'>" +
                    "<p class=''text-danger i18n' id='expired' name='expired' style='display: none;'></p>" +
                    "<p class=''text-warning i18n' name='not_expired'></p>" +
                    "</div>" +
                    "</td>" +
                    "<td>" +
                    "<div class='dropdown dropright'>" +
                    "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    "<div class='dropdown-menu'>" +
                    "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    "<a id='remove_when_expired' class='dropdown-item i18n' data-toggle='modal' href='#formModal'></a>" +
                    "</div>" +
                    "</div>" +
                    "</td>";
            }else if(states[0] === "1" || states[0] === "2"){
                rowTr.innerHTML =
                    "<th scope='row'>" + list["policy_number"] + "</th>" +
                    "<td>" + list["policy_name"] + "</td>" +
                    "<td>" + list["time"] + "</td>" +
                    "<td>" +
                    "<div id='made_claim' style='display: block;'>" +
                    "<a class='btn btn-sm btn-outline-light i18n' name='view' role='button' data-toggle='modal' href='#processModal'></a>" +
                    "</div>" +
                    "</td>" +
                    "<td>" +
                    "<div class='dropdown dropright'>" +
                    // "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    // "<div class='dropdown-menu'>" +
                    "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    // "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    // "</div>" +
                    "</div>" +
                    "</td>";
            }else{
                rowTr.innerHTML =
                    "<th scope='row'>" + list["policy_number"] + "</th>" +
                    "<td>" + list["policy_name"] + "</td>" +
                    "<td>" + list["time"] + "</td>" +
                    "<td>" +
                    "<div id='made_claim' style='display: block;'>" +
                    "<a class='btn btn-sm btn-outline-light i18n' name='view' role='button' data-toggle='modal' href='#processModal'></a>" +
                    "</div>" +
                    "</td>" +
                    "<td>" +
                    "<div class='dropdown dropright'>" +
                    "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    "<div class='dropdown-menu'>" +
                    "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    "</div>" +
                    "</div>" +
                    "</td>";
            }
            $("#policy_list").append(rowTr);
        }
    }


    $("#account-policy-tab").click(function() {
        var params = {};
        params["phone_number"] = getCookie("phone_number");
        $.ajax({
            type: "POST",
            url: url + "/user/policy/list",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                // $("#policy_list").empty()
                var list = data["Message"];
                var policies = [];
                $.each(list, function (index, n) {
                    policies.push(list[index]["policy_number"]);
                    window.localStorage.setItem(list[index]["policy_number"], JSON.stringify(list[index]));
                    // var rowTr = document.createElement("tr");
                    // var states = list[index]["states"].split("@@");
                    // if(states[0] === "0"){
                    //     rowTr.innerHTML =
                    //         "<th scope='row'>" + list[index]["policy_number"] + "</th>" +
                    //         "<td>" + list[index]["policy_name"] + "</td>" +
                    //         "<td>" + list[index]["time"] + "</td>" +
                    //         "<td>" +
                    //             "<div id='not_claim'>" +
                    //                 "<p class=''text-danger i18n' id='expired' name='expired' style='display: none;'></p>" +
                    //                 "<p class=''text-warning i18n' name='not_expired'></p>" +
                    //             "</div>" +
                    //         "</td>" +
                    //         "<td>" +
                    //             "<div class='dropdown dropright'>" +
                    //                 "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    //                 "<div class='dropdown-menu'>" +
                    //                     "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    //                     "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    //                 "</div>" +
                    //             "</div>" +
                    //         "</td>";
                    // }else if(states[0] === "1" || states[0] === "2"){
                    //     rowTr.innerHTML =
                    //         "<th scope='row'>" + list[index]["policy_number"] + "</th>" +
                    //         "<td>" + list[index]["policy_name"] + "</td>" +
                    //         "<td>" + list[index]["time"] + "</td>" +
                    //         "<td>" +
                    //             "<div id='made_claim' style='display: block;'>" +
                    //                 "<a class='btn btn-sm btn-outline-light i18n' name='view' role='button' data-toggle='modal' href='#processModal'></a>" +
                    //             "</div>" +
                    //         "</td>" +
                    //         "<td>" +
                    //             "<div class='dropdown dropright'>" +
                    //                 // "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    //                 // "<div class='dropdown-menu'>" +
                    //                     "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    //                     // "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    //                 // "</div>" +
                    //             "</div>" +
                    //         "</td>";
                    // }else{
                    //     rowTr.innerHTML =
                    //         "<th scope='row'>" + list[index]["policy_number"] + "</th>" +
                    //         "<td>" + list[index]["policy_name"] + "</td>" +
                    //         "<td>" + list[index]["time"] + "</td>" +
                    //         "<td>" +
                    //             "<div id='made_claim' style='display: block;'>" +
                    //                 "<a class='btn btn-sm btn-outline-light i18n' name='view' role='button' data-toggle='modal' href='#processModal'></a>" +
                    //             "</div>" +
                    //         "</td>" +
                    //         "<td>" +
                    //             "<div class='dropdown dropright'>" +
                    //                 "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    //                 "<div class='dropdown-menu'>" +
                    //                     "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    //                     "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    //                 "</div>" +
                    //             "</div>" +
                    //         "</td>";

                    window.localStorage.setItem("policies", JSON.stringify(policies));

                })
                    // rowTr.innerHTML =
                    //     "<th scope='row'>" + list[index]["policy_number"] + "</th>" +
                    //     "<td>" + list[index]["policy_name"] + "</td>" +
                    //     "<td>" + list[index]["time"] + "</td>" +
                    //     "<td>" +
                    //         "<div id='not_claim'>" +
                    //             "<p class=''text-danger i18n' id='expired' name='expired' style='display: none;'></p>" +
                    //             "<p class=''text-warning i18n' name='not_expired'></p>" +
                    //         "</div>" +
                    //
                    //         "<div id='made_claim' style='display: none;'>" +
                    //             "<a class='btn btn-sm btn-outline-light i18n' name='view' role='button' data-toggle='modal' href='#processModal'></a>" +
                    //         "</div>" +
                    //     "</td>" +
                    //     "<td>" +
                    //         "<div class='dropdown dropright'>" +
                    //             "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' name='more' role='button' data-toggle='dropdown'></a>" +
                    //             "<div class='dropdown-menu'>" +
                    //                 "<a class='dropdown-item i18n' name='details' data-toggle='modal' href='#detailModal'></a>" +
                    //                 "<a id='remove_when_expired' class='dropdown-item i18n' name='make_claim' data-toggle='modal' href='#formModal'></a>" +
                    //             "</div>" +
                    //         "</div>" +
                    //     "</td>";

                    // rowTr.innerHTML =
                    //     "<div class='d-flex w-100 justify-content-between'>" +
                    //     " <h5 class='mb-1'>" + list[index]["policy_number"] + "</h5>" +
                    //     "<small id='time'>" + list[index]["time"] + "</small>" +
                    //     "</div>" +
                    //     "<small class='text-truncate'>" + list[index]["place"] + "</small>";
                    // window.localStorage.setItem("list", rowTr);

                    // $("#policy_list").append(rowTr);
                // });
                information()
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    })

    // function connect(address, params) {
    //     $.ajax({
    //         type: "POST",
    //         // url: "http://101.132.96.76:8080/"+address,
    //         url: "http://localhost:8080/" + address,
    //         dataType: "text",
    //         data: params,
    //         success: function (data) {
    //             alert("Saved")
    //         },
    //         error: function (jqXHR) {
    //             alert("it aleady exists")
    //         }
    //     });
    // }

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
        // 改
        $('#account_info_email_change').attr('disabled', false);
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
            $("#elseDiv").show();
        }
        if (!$("#customCheck5").is(':checked')) {
            $("#elseDiv").hide();
        }
    });

    $('#processModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont2',
            clickAble: false,
            stepCounts:3,
            steps:['1','2','3'],
            showBtn:false,
            curStep:2
        })

        //当需要改变process步骤的时候：
        $(".ystep-container").html('');
        var step2 = new SetStep({
            content: '.stepCont2',
            clickAble: false,
            stepCounts:3,
            steps:['1','2','3'],
            showBtn:false,
            curStep:1 //要直接在curStep里改
        })

        //


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

    $('#guideModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont1',
            clickAble: true,
            stepCounts: 3,
            steps: ['1', '2', '3'],
            showBtn: false,
            curStep: 1,
        })
    });
    $('#guideModal').on('hidden.bs.modal', function () {
        $(".ystep-container").html('')
    });

    $('#infoModal').on('shown.bs.modal', function () {
        var step2 = new SetStep({
            content: '.stepCont3',
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

    $("#account-info").text(getCookie("user_phone_number"));

    //获取cookie
    function getCookie(userName){
        if (document.cookie.length>0){
            c_start=document.cookie.indexOf(userName+ "=");
            if (c_start!=-1){
                c_start=c_start + userName.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1){
                    c_end=document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }

});