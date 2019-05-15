$(document).ready(function () {
    var url = "http://localhost:8080/";
    // var url = "http://101.132.96.76:8080/";
    // console.log(window.localStorage.getItem("policies"))
    if (window.localStorage.getItem("policies") !== null)
        information();
    else
        $("#account-policy-tab").click()

    function information() {
        $("#policy_list").empty();
        var pn = JSON.parse(window.localStorage.getItem("policies"));
        for(var i = 0 ; i < pn.length; i++){
            var list = JSON.parse(window.localStorage.getItem(pn[i]));
            var rowTr = document.createElement("tr");
            var states = list["states"].split("@@");
            var language = $("#language_button").text();

            if (language === "English"){
                if(states[0] === "0"){
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='not_claim'>" +
                        "<p class=''text-danger i18n' id='expired' name='expired' style='display: none;'></p>" +
                        "<p class=''text-warning i18n' name='not_expired'></p>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' role='button' data-toggle='dropdown'>更多</a>" +
                        "<div class='dropdown-menu'>" +
                        "<a class='dropdown-item i18n' data-toggle='modal'  data-whatever='"+ list["policy_number"]+"' href='#detailModal'>关于保单</a>" +
                        "<a id='remove_when_expired' class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#formModal'>进行申报</a>" +
                        "</div>" +
                        "</div>" +
                        "</td>";
                }else if(states[0] === "1" || states[0] === "2"){
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='made_claim' style='display: block;'>" +
                        "<a class='btn btn-sm btn-outline-light i18n' role='button' data-whatever='"+JSON.stringify(list)+"' data-toggle='modal' href='#processModal'>查看</a>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n'  data-whatever='"+ list["policy_number"]+"' data-toggle='modal' href='#detailModal'>关于保单</a>" +
                        "</div>" +
                        "</td>";
                }else{
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='made_claim' style='display: block;'>" +
                        "<a class='btn btn-sm btn-outline-light i18n' role='button' data-whatever='"+JSON.stringify(list)+"' data-toggle='modal' href='#processModal'>查看</a>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' role='button' data-toggle='dropdown'>更多</a>" +
                        "<div class='dropdown-menu'>" +
                        "<a class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#detailModal'>关于保单</a>" +
                        "<a id='remove_when_expired' class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#formModal'>重新申报</a>" +
                        "</div>" +
                        "</div>" +
                        "</td>";
                }
            } else {
                if(states[0] === "0"){
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='not_claim'>" +
                        "<p class=''text-danger i18n' id='expired' name='expired' style='display: none;'></p>" +
                        "<p class=''text-warning i18n' name='not_expired'></p>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' role='button' data-toggle='dropdown'>More</a>" +
                        "<div class='dropdown-menu'>" +
                        "<a class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#detailModal'>Details</a>" +
                        "<a id='remove_when_expired' class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#formModal'>Make Claim</a>" +
                        "</div>" +
                        "</div>" +
                        "</td>";
                }else if(states[0] === "1" || states[0] === "2"){
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='made_claim' style='display: block;'>" +
                        "<a class='btn btn-sm btn-outline-light i18n' role='button' data-toggle='modal' data-whatever='"+JSON.stringify(list)+"' href='#processModal'>View</a>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#detailModal'>Details</a>" +
                        "</div>" +
                        "</td>";
                }else{
                    rowTr.innerHTML =
                        "<th scope='row'>" + list["policy_number"] + "</th>" +
                        "<td>" + list["policy_name"] + "</td>" +
                        "<td>" + list["end_time"] + "</td>" +
                        "<td>" +
                        "<div id='made_claim' style='display: block;'>" +
                        "<a class='btn btn-sm btn-outline-light i18n' role='button' data-toggle='modal' data-whatever='"+JSON.stringify(list)+"' href='#processModal'>View</a>" +
                        "</div>" +
                        "</td>" +
                        "<td>" +
                        "<div class='dropdown dropright'>" +
                        "<a class='btn btn-sm btn-outline-light dropdown-toggle i18n' role='button' data-toggle='dropdown'>More</a>" +
                        "<div class='dropdown-menu'>" +
                        "<a class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#detailModal'>Details</a>" +
                        "<a id='remove_when_expired' class='dropdown-item i18n' data-toggle='modal' data-whatever='"+ list["policy_number"]+"' href='#formModal'>Make Claim</a>" +
                        "</div>" +
                        "</div>" +
                        "</td>";
                }
            }

            $("#policy_list").append(rowTr)
            // window.localStorage.removeItem()
        }
    }


    $('#detailModal').on('shown.bs.modal', function (event) {
        var policy_number = $(event.relatedTarget).data("whatever");
        var params = {};

        params["policy_number"] = policy_number;
        // console.log(params);
        $.ajax({
            type: "POST",
            url: url + "user/lost_luggage/receive",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                // $("#policy_list").empty()

                var message = data["Message"];
                // console.log(message);
                $("#applicant_number_value").text(message["policy_number"]);
                $("#applicant_name_value").text(message["policy_name"]);
                $("#applicant_id_value").text(message["id_number"]);
                $("#applicant_tel_value").text(message["phone_number"]);
                $("#applicant_start_time").text(message["start_time"]);
                $("#applicant_end_time").text(message["end_time"]);

                // window.localStorage.setItem("cur_id", message["id_number"]);
                // window.localStorage.setItem("cur_pn", message["policy_number"]);
                // window.localStorage.setItem("cur_pna", message["policy_name"]);
                // window.localStorage.setItem("cur_ph", message["phone_number"]);

                if(message["states"].split("@@")[0] !== 0){
                    $("#detail_claimdetail").css("display", "block");
                    $("#claim_place_value").text(message["place"])
                    $("#claim_date_value").text(message["time"])
                    $("#claim_detail_value").text(message["reason"])
                    $("#claim_detail_price").text(message["price"])
                    // $("#fileImage").css("display", "block")
                    $("#fileImage").attr("src", message["picture"]);
                    // console.log(message["picture"])
                    // console.log($("#fileImage").attr("src"))
                }else{
                    $("#detail_claimdetail").css("display", "none");
                }
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    });

    $("#renew").click(function () {
        var now = $("#applicant_end_time").text().split("/");
        if(now[1] === "12"){
            now[0] = (parseInt(now[0])+1).toString()
            now[1] = 1;
            now[2] = 1;
        }else{
            now[1] = (parseInt(now[1])+1).toString()
            now[2] = 1;
        }
        var newtime = now.join("/");
        var params = {};
        params["policy_number"] =  $("#applicant_number_value").text();
        params["end_time"] = newtime;

        $.ajax({
            type: "POST",
            url: url + "user/policy/renew",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
               $("#applicant_end_time").text(newtime);
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    })

    $("#account-policy-tab").click(function () {
        var params = {};
        params["phone_number"] = getCookie("phone_number");
        $.ajax({
            type: "POST",
            url: url + "user/policy/list",
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
                });
                window.localStorage.setItem("policies", JSON.stringify(policies));
                information()
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    })

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

    $('#navButton').click(function () {
        if (!$("#navBar").hasClass('show')) {
            $("header").css('animation', 'extend_header 0.5s');
            $("header").css('height', '40%');
        } else {
            $("header").css('animation', 'shrink_header 1s');
            $("header").css('height', '20%');
        }
    })


    $('.tooltip-account').tooltipster({
        animation: 'fade',
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        trigger: 'custom',
        triggerOpen: {
            click: true,
            tap: true
        },
        triggerClose: {
            click: true,
            tap: true
        },
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


    $('#formModal').on('shown.bs.modal', function (event) {
        var policy_number = $(event.relatedTarget).data("whatever");
        var params = {};
        params["policy_number"] = policy_number;
        // console.log(params);
        $.ajax({
            type: "POST",
            url: url + "user/lost_luggage/receive",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                // $("#policy_list").empty()
                var message = data["Message"];
                // console.log(message);
                $("#policy_number_input").val(message["policy_number"]);
                $("#policy_name_input").val(message["policy_name"]);
                $("#id_number_input").val(message["id_number"]);
                $("#phone_number_input").val(message["phone_number"]);
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    })

    $("#form_submit").on("click", function () {
        var bootstrapValidator = $("#claimForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //提交申诉
            var params = {};
            params["policy_number"] = $("#policy_number_input").val();
            params["policy_name"] = $("#policy_name_input").val();
            params["phone_number"] = $("#phone_number_input").val();
            params["time"] = $("#time_input").val();
            // params["place"] = $("#place_input").val();
            params["reason"] = $("#detail_input").val();
            // params["price"] = $("#price_input").val();

            params["place"] = $("#place_input option:selected").text();
            console.log(params["place"])

            var option = $("#price_input option:selected").index();
            console.log(option)
            if(option === 0){
                params["price"] = "101";
            }else if(option === 1){
                params["price"] = "102";
            }else if(option === 2){
                params["price"] = "103";
            }else if(option === 3){
                params["price"] = "104";
            }


            // console.log("running")
            // params["picture"] = $("#imgFile").val();
            var file = $("#imgFile")[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                params["picture"] = reader.result;
                if($("#made_claim").css("display") === "block"){
                    params["states"] = "1@@0@@0";
                }else{
                    params["states"] = "0@@0@@0";
                }
                // console.log(params);
                $.ajax({
                    type: "POST",
                    url: url + "user/lost_luggage/submit_OR_update",
                    contentType: "application/json",
                    dataType: "json",
                    async: false,
                    data: JSON.stringify(params),
                    success: function (data) {
                        //成功
                        // alert(data["Checkcode"])
                        $('#formModal').fadeOut();
                        $('.modal-backdrop').remove();
                        $('#remove_when_expired').remove();
                        $('#detail_claimdetail').css('display', 'block');
                        $('#not_claim').remove();
                        $('#made_claim').css('display', 'block');
                        $('#imgFile').val('');
                        $('#preview img').remove();
                        $('#uploadFile').css('display', 'block');
                        $(".uploadBox").removeClass("uploadBox-without-bg");
                        $('#successModal').modal('show');
                    },
                    error: function (jqXHR) {
                        alert("wrong: " + jqXHR.status)
                    }
                })
                // console.log(reader.result)
            };

        }
        // //不成功
        // $('#failModal').modal('show');
    });

    $('#form_cancel').click(function () {
        $('#claimForm').data('bootstrapValidator').resetForm(true);
        $('#imgFile').val('');
        $('#preview img').remove();
        $('#uploadFile').css('display', 'block');
        $(".uploadBox").removeClass("uploadBox-without-bg");
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
            if(window.localStorage.getItem("password") === $("#passowrd-check-input").val()){
            //如果一致：
                $('#change_password_form').data('bootstrapValidator').resetForm(true);
                $('#passwordModal_check').modal("hide");
                $('.modal-backdrop').remove();
                $('#passwordModal_change').modal("show");
            }else{
                //如果不一致
                $('#failModal').modal('show');
            }

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
            var newPassword = $("#password-change").val();
            var user1  = {};
            user1["phone_number"] = getCookie("user_phone_number");
            user1["password"] = newPassword;
            $.ajax({
                type: "POST",
                url: url + "user/personal_information/change_password",
                contentType: "application/json",
                dataType: "json",
                async: false,
                data: JSON.stringify(user1),
                success: function (data) {
                    $('#password-new-form').data('bootstrapValidator').resetForm(true);
                    $('#passwordModal_change').modal("hide");
                    $('.modal-backdrop').remove();
                    $('#successModal').modal('show');
                },
                error: function (jqXHR) {
                    alert("wrong: " + jqXHR.status)
                }
            })
            //成功

            // //不成功
            // $('#failModal').modal('show');
        }
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

    // $("#email_bonded_submit").on("click", function () {
    //     var bootstrapValidator = $("#bonded-email-form").data('bootstrapValidator');
    //     bootstrapValidator.validate();
    //     if (bootstrapValidator.isValid()) {
    //         //修改邮箱
    //         //验证邮箱和验证码
    //
    //         //成功
    //         $('#successModal').modal('show');
    //         $('#bonded-email-form').data('bootstrapValidator').resetForm(true);
    //         $('#emailModal_bonded').modal("hide");
    //         $('.modal-backdrop').remove();
    //
    //         // //不成功
    //         // $('#failModal').modal('show');
    //     }
    //     else return;
    // });

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
            var email = $("#email_input").val();
            var user1  = {};
            user1["phone_number"] = getCookie("user_phone_number");
            user1["email"] = email;
            $.ajax({
                type: "POST",
                url: url + "user/personal_information/ci",
                contentType: "application/json",
                dataType: "json",
                async: false,
                data: JSON.stringify(user1),
                success: function (data) {
                    $('#successModal').modal('show');
                    $('#bond-email-form').data('bootstrapValidator').resetForm(true);
                    $('#emailModal').modal("hide");
                    $('.modal-backdrop').remove();
                },
                error: function (jqXHR) {
                    alert("wrong: " + jqXHR.status)
                }
            })
            //成功


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

        $('#imgFile').val('');
        $('#preview img').remove();
        $('#uploadFile').css('display', 'block');
        $(".uploadBox").removeClass("uploadBox-without-bg");
    });
    $('#passwordModal_check .close').click(function () {
        $('#change_password_form').data('bootstrapValidator').resetForm(true);
    });
    $('#passwordModal_change .close').click(function () {
        $('#password-new-form').data('bootstrapValidator').resetForm(true);
    });

    $('#processModal').on('shown.bs.modal', function (event) {

        // console.log($(event.relatedTarget).data("whatever"))
        var list = $(event.relatedTarget).data("whatever");
        var states = list["states"].split("@@");
        var curStep = parseInt(states[0]);
        var step2;
        if(curStep !== 0){
            step2 = new SetStep({
                content: '.stepCont2',
                clickAble: false,
                stepCounts: 3,
                steps: ['1', '2', '3'],
                showBtn: false,
                curStep: curStep,
            })
        }else{
            step2 = new SetStep({
                content: '.stepCont2',
                clickAble: false,
                stepCounts: 3,
                steps: ['1', '2', '3'],
                showBtn: false,
                curStep: 1
            })
        }
        console.log(step2)



        // //当需要改变process步骤的时候：
        // $(".ystep-container").html('');
        // var step2 = new SetStep({
        //     content: '.stepCont2',
        //     clickAble: false,
        //     stepCounts: 3,
        //     steps: ['1', '2', '3'],
        //     showBtn: false,
        //     curStep: 1,//要直接在curStep里改
        // })

        //

        $('#to_process_title').css('display', 'none');
        $('#processing_title').css('display', 'none');
        $('#processing_1').css('display', 'none');
        $('#processing_2_1').css('display', 'none');
        $('#processing_2_2').css('display', 'none');
        $('#processed_title').css('display', 'none');
        $('#processed_1').css('display', 'none');
        $('#processed_2_1').css('display', 'none');
        $('#processed_2_2').css('display', 'none');

        // console.log(states)
        //根据步骤改变标题和内容
        // var curstep = step2.opt.curStep;
        if (curStep === 1) {
            $('#to_process_title').css('display', 'block');

        } else if (curStep === 2) {
            $('#processing_title').css('display', 'block');

            //阶段一：正在找回：默认

            if (parseInt(states[1]) === 1) {
                //阶段二：找回：寄行李
                // $('#processing_1').css('display', 'none');
                $('#processing_2_1').css('display', 'block');
            }else if(parseInt(states[1]) === 2){
            //阶段二：未找回：索赔
            //     $('#processing_1').css('display', 'none');
                $('#processing_2_2').css('display', 'block');
            }
        } else if (curStep === 3) {
            $('#processed_title').css('display', 'block');

            if (parseInt(states[1]) === 0) {
                //第一种情况：直接被拒
                $('#processed_1').css('display', 'block');
            }else if (parseInt(states[2]) === 1) {
                //第二种情况：行李寄出
                $('#processed_2_1').css('display', 'block');
            }else if (parseInt(states[2]) === 2) {
                //第三种情况：汇款打出
                $('#processed_2_2').css('display', 'block');
            }
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
    function getCookie(userName) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(userName + "=");
            if (c_start != -1) {
                c_start = c_start + userName.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    var user  = {};
    user["phone_number"] = getCookie("user_phone_number");
    $.ajax({
        type: "POST",
        url: url + "user/personal_information/pi",
        contentType: "application/json",
        dataType: "json",
        async: false,
        data: JSON.stringify(user),
        success: function (data) {
            var message = data["Message"];
            //成功
            // alert(data["Checkcode"])
            $("#account-info-name").val(message["fullname"]);
            $("#account-info-id").val(message["id_number"]);
            $("#account-info-tel").val(message["phone"]);
            window.localStorage.setItem("password", message["password"]);
            // console.log(message["email"])
            if (message["email"] !== ""){
                $("#account_information").attr("href", "#accountModal_bonded");
                $("#account-info-email").val(message["email"]);
                window.localStorage.setItem("email", message["email"]);
            }else{
                $("#account_information").attr("href", "#accountModal");

            }
        },
        error: function (jqXHR) {
            alert("wrong: " + jqXHR.status)
        }
    })

});

function preview(file) {
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            $('#uploadFile').css('display', 'none');
            $('#preview').append('<img src="' + evt.target.result + '" />');
        };
        reader.readAsDataURL(file.files[0]);
        $(".uploadBox").addClass("uploadBox-without-bg");
    }
    else {
        $('#preview').append('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
    }
    if (!$(".uploadBox input[type='file']").val()) {
        $(".uploadBox").removeClass("uploadBox-without-bg");
    }
}




