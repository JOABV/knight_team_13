$(document).ready(function () {

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
        } else {
            params["price"] = "103"
        }
        alert(states)
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + "/staff/lost_luggage/list",
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
                    // rowTr.id = "node" + index;
                    rowTr.attr('data-toggle', 'modal');
                    rowTr.attr('href', '#detailModal');
                    // var rowTr = document.createElement('tr')
                    // rowTr.className = "node";
                    rowTr.innerHTML =
                        "<div class='d-flex w-100 justify-content-between'>" +
                        " <h5 class='mb-1'>" + list[index]["policy_number"] + "</h5>" +
                        "<small id='time'>" + list[index]["time"] + "</small>" +
                        "</div>" +
                        "<small class='text-truncate'>" + list[index]["place"] + "</small>";
                    // rowTr.innerHTML =
                    //     "<td>" + list[index]["policy_number"]+ "</td>" +
                    //     "<td>" + list[index]["time"]+ "</td>" +
                    //     "<td>" + list[index]["place"]+ "</td>" +
                    //     "<td>" + list[index]["price"]+ "</td>";
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
    });

    $("#price2").click(function () {
        $(this).addClass("active");
        $("#price1").removeClass("active")
        $("#price3").removeClass("active")
    });

    $("#price3").click(function () {
        $(this).addClass("active");
        $("#price1").removeClass("active")
        $("#price2").removeClass("active")
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

            $('#claimdetail-form').data('bootstrapValidator').resetForm(true);
            $('#detailModal').modal("hide");
            $('.modal-backdrop').remove();
        }
        // 进入processed：
        // // 结果1：被拒
        // $('#deniedMes').css('display', 'block');

        // // 结果2：寄出
        // $('#findMes').css('display', 'block');

        // // 结果3：赔钱
        // $('#nonfindMes').css('display', 'block');
    });


    $('#detailModal').on('shown.bs.modal', function () {
        // 获取保单详情数据
        // #applicant_number_value "policy_number"
        // #applicant_name_value "policy_name"
        // #applicant_tel_value "phone_number"
        // #claim_place_value "place"
        // #claim_date_value "time"
        // #claim_detail_value "reason"
        // #fileImage.src "picture"

        // 默认情况：同意/不同意

        // 找回/未找回
        $('#approveDropdown').css('display', 'none');
        $('#findDropdown').css('display', 'block');

        // 如找回：寄回/未寄回
        $('#findDropdown').css('display', 'none');
        $('#result_findDropdown').css('display', 'block');

        // 如未找回：索赔/未索赔
        $('#findDropdown').css('display', 'none');
        $('#result_unfindDropdown').css('display', 'block');
    });

    $('#detailModal .close').click(function () {
        $('#claimdetail-form').data('bootstrapValidator').resetForm(true);
    });

});