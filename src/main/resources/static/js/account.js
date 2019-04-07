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

    $("#form_submit").click(function () {
        var params = {}
        params.police_number = $('#inputPolicyNo').val()
        params.time = $('#formPlace').val()
        params.date = $('#formDate').val()
        params.reason = $('#inputName').val()
        params.remark = $('#inputID').val()
        params.price = $('#inputTel').val()
        connect("user/lost_luggage", params)
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