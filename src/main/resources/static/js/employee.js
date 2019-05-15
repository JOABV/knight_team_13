$(document).ready(function () {

    // var url = "http://101.132.96.76:8080/";
    var url = "http://localhost:8080/";

    $("#processing-list").click();

    function message(states) {
        var params = {};
        params["length"] = 10;
        params["states"] = states;
        var time_idx = $("#time_active .active").index();
        if (time_idx === 0) {
            params["time"] = "101"
        } else {
            params["time"] = "102"
        }
        params["place"] = $("#place_active .active").text();
        var price_idx = $("#price_active .active").index();
        if (price_idx === 0) {
            params["price"] = "101"
        } else if (price_idx === 1) {
            params["price"] = "102"
        } else if(price_idx === 2){
            params["price"] = "103"
        }else{
            params["price"] = "104"
        }
        $.ajax({
            type: "POST",

            url: url + "/staff/lost_luggage/list",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                if (states === "101")
                    $("#toprocess_list").empty();
                else if (states === "102")
                    $("#processing_list").empty();
                else if (states === "103")
                    $("#processed_list").empty();
                var list = data["Message"];
                $.each(list, function (index, n) {
                    var rowTr = document.createElement("a");
                    rowTr.className = "list-group-item list-group-item-action flex-column align-items-start";
                    rowTr.setAttribute('data-toggle', 'modal');
                    rowTr.setAttribute('href','#detailModal');
                    rowTr.setAttribute("data-whatever", list[index]["policy_number"]+"@@"+states);
                    rowTr.innerHTML =
                        "<div class='d-flex w-100 justify-content-between'>" +
                        " <h5 class='mb-1'>" + list[index]["policy_number"] + "</h5>" +
                        "<small id='time'>" + list[index]["time"] + "</small>" +
                        "</div>" +
                        "<small class='text-truncate'>" + list[index]["place"] + "</small>";
                    if (states === "101")
                        $("#toprocess_list").append(rowTr);
                    else if (states === "102")
                        $("#processing_list").append(rowTr);
                    else if (states === "103")
                        $("#processed_list").append(rowTr);
                });
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    }


    $("#toprocess-list").on("click", function () {
        message("101")
    });
    $("#processing-list").on("click", function () {
        message("102")
    });
    $("#processed-list").on("click", function () {
        message("103")
    });

    //basic change
    $("#time1").click(function () {
        $(this).addClass("active");
        $("#time2").removeClass("active")
    });

    $("#time2").click(function () {
        $(this).addClass("active");
        $("#time1").removeClass("active")
    });

    $("#place1").click(function () {
        $(this).addClass("active");
        $("#place2").removeClass("active")
        $("#place3").removeClass("active")
    });

    $("#place2").click(function () {
        $(this).addClass("active");
        $("#place1").removeClass("active")
        $("#place3").removeClass("active")
    });

    $("#place3").click(function () {
        $(this).addClass("active");
        $("#place1").removeClass("active")
        $("#place2").removeClass("active")
    });

    $("#price1").click(function () {
        $(this).addClass("active");
        $("#price2").removeClass("active")
        $("#price3").removeClass("active")
        $("#price4").removeClass("active")
    });

    $("#price2").click(function () {
        $(this).addClass("active");
        $("#price1").removeClass("active")
        $("#price3").removeClass("active")
        $("#price4").removeClass("active")
    });

    $("#price3").click(function () {
        $(this).addClass("active");
        $("#price1").removeClass("active")
        $("#price2").removeClass("active")
        $("#price4").removeClass("active")
    });

    $("#price4").click(function () {
        $(this).addClass("active");
        $("#price1").removeClass("active")
        $("#price2").removeClass("active")
        $("#price3").removeClass("active")
    });

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


    $('#claimdetail-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            feedbackInput: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#claimdetail_submit").on("click", function () {
        var bootstrapValidator = $("#claimdetail-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            // 提交处理结果
            var params = {};
            var option;

            if ($('#approveDropdown').css('display') === 'block'){
                option = $("#approveDropdown option:selected").index();
                if (option === 0)
                    params["isAccept"] = "1";
                else
                    params["isAccept"] = "0";

                params["policy_number"] = $("#applicant_number_value").text();
                params["feedback"] = $('#more_info').text();
                params["staff_number"] = "123";

                $.ajax({
                    type: "POST",
                    url: url + "staff/lost_luggage/claim_accept_OR_reject",
                    contentType: "application/json",
                    dataType: "json",
                    async: false,
                    data: JSON.stringify(params),
                    success: function (data) {

                    },
                    error: function (jqXHR) {
                        alert("wrong: " + jqXHR.status)
                    }
                });
                $("#toprocess-list").click();
            }else{
                params["policy_number"] = $("#applicant_number_value").text();
                if($('#findDropdown').css('display') === 'block'){
                    option = $("#findDropdown option:selected").index();
                    if(option === 0){
                        params["states"] = "0"
                    }else if(option === 1){
                        params["states"] = "1"
                    }else if(option === 2){
                        params["states"] = "2"
                    }
                    params["feedback"] = $("#more_info_input").val() ;
                    params["isTheLastSubmit"] = "0"
                }else if($('#result_findDropdown').css('display') === 'block'){
                    option = $("#result_findDropdown option:selected").index();
                    if(option === 0){
                        params["states"] = "0"
                    }else if(option === 1){
                        params["states"] = "1"
                    }else if(option === 2){
                        params["states"] = "2"
                    }
                    params["feedback"] = $("#more_info_input").val();
                    params["isTheLastSubmit"] = "1"
                }else if($('#result_unfindDropdown').css('display') === 'block'){
                    option = $("#result_unfindDropdown option:selected").index();
                    if(option === 0){
                        params["states"] = "0"
                    }else if(option === 1){
                        params["states"] = "1"
                    }else if(option === 2){
                        params["states"] = "2"
                    }
                    params["feedback"] = $("#more_info_input").val();
                    params["isTheLastSubmit"] = "1"
                }
                // console.log($('#findDropdown').css('display'))
                // console.log($('#result_unfindDropdown').css('display'))
                // console.log(params)
                $.ajax({
                    type: "POST",
                    url: url + "staff/lost_luggage/feedback_submit",
                    contentType: "application/json",
                    dataType: "json",
                    async: false,
                    data: JSON.stringify(params),
                    success: function (data) {
                        // console.log(data)
                        $('#claimdetail-form').data('bootstrapValidator').resetForm(true);
                        $('#detailModal').modal("hide");
                        $('.modal-backdrop').remove();
                    },
                    error: function (jqXHR) {
                        alert("wrong: " + jqXHR.status)
                    }
                });
                $("#processing-list").click();
            }
        }
        // 进入processed：
        // // 结果1：被拒
        // $('#deniedMes').css('display', 'block');

        // // 结果2：寄出
        // $('#findMes').css('display', 'block');

        // // 结果3：赔钱
        // $('#nonfindMes').css('display', 'block');
    });

    $('#detailModal').on('shown.bs.modal', function (event) {

        var params = {};
        var message = $(event.relatedTarget).data("whatever").split("@@");
        params["policy_number"] = message[0];
        params["states"] = message[1];

        var claim_states;
        var feedbacks;

        $.ajax({
            type: "POST",
            url: url + "staff/lost_luggage/one_Message",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                var msg = data["Message"];
                $("#applicant_number_value").text(msg["policy_number"]);
                $("#applicant_name_value").text(msg["full_name"]);
                $("#applicant_tel_value").text(msg["phone_number"]);
                $("#claim_place_value").text(msg["place"]);
                $("#claim_date_value").text(msg["time"]);
                $("#claim_detail_value").text(msg["reason"]);
                $("#applicant_id_value").text(msg["id_number"]);
                $("#fileImage").attr("src", msg["picture"]);
                claim_states = msg["states"].split("@@");
                feedbacks = msg["feedback"].split("@@");
                // alert(feedbacks)
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });

        $("#message1").css("display", "none");
        $("#message2").css("display", "none");
        $("#message3").css("display", "none");

        var option;

        if(feedbacks[0] !== "xxxx"){
            if(claim_states[0] === "2"){
                option = "Accept";
            }else{
                option = "Reject";
            }
            $("#message1").css("display", "block");
            $("#message1_option").text(option);
            $("#message1_feedback").text(feedbacks[0])
        }
        if(feedbacks[1] !== "xxxx"){
            if(claim_states[1] === "1"){
                option = "Find Baggage";
            }else{
                option = "Did Not Find";
            }
            $("#message2").css("display", "block");
            $("#message2_option").text(option);
            $("#message2_feedback").text(feedbacks[1])
        }
        if(feedbacks[2] !== "xxxx"){
            if(claim_states[1] === "1"){
                if(claim_states[2] === "1"){
                    option = "Delivered";
                }else {
                    option = "Fail To Deliver";
                }
            }else{
                if(claim_states[2] === "1"){
                    option = "Paid";
                }else {
                    option = "Fail To pay";
                }
            }
            $("#message3").css("display", "block");
            $("#message3_option").text(option);
            $("#message3_feedback").text(feedbacks[2])
        }
        // 获取保单详情数据

        //#fileImage.src //"picture"

        // 默认情况：同意/不同意
        // alert(claim_states)

        $('#deniedMes').css('display', 'none');
        $('#findMes').css('display', 'none');
        $('#nonfindMes').css('display', 'none');

        $('#result_findDropdown').css('display', 'none');
        $('#findDropdown').css('display', 'none');
        $('#result_unfindDropdown').css('display', 'none');

        if(claim_states[0] === "2"){
            $('#approveDropdown').css('display', 'none');
            $('#more_info').css('display', 'block');
            $('#claimdetail_submit').css('display', 'block');
            if(claim_states[1] === "0" ){
                // 找回/未找回
                $('#findDropdown').css('display', 'block');
            }else if(claim_states[1] === "1" && claim_states[2] === "0"){
                // 如找回：寄回/未寄回
                // $('#findDropdown').css('display', 'none');
                $('#result_findDropdown').css('display', 'block');
            }else if(claim_states[1] === "2" && claim_states[2] === "0"){
                // 如未找回：索赔/未索赔
                // $('#findDropdown').css('display', 'none');
                $('#result_unfindDropdown').css('display', 'block');
            }
        }else if (claim_states[0] === "3"){
            $('#approveDropdown').css('display', 'none');
            $('#more_info').css('display', 'none');
            $('#claimdetail_submit').css('display', 'none');
            if(claim_states[1] === "0"){
                $('#deniedMes').css('display', 'block');
            }else if(claim_states[1] === "1"){
                $('#findMes').css('display', 'block');
            }else if(claim_states[1] === "2"){
                $('#nonfindMes').css('display', 'block');
            }
        }

    });

    $('#detailModal .close').click(function () {
        $('#claimdetail-form').data('bootstrapValidator').resetForm(true);
    });

});