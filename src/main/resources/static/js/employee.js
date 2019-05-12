$(document).ready(function () {

    function message(states){
        var params = {};
        params["length"] = 10;
        params["states"] = states;
        var time_idx = $("#time_active .active").index();
        if(time_idx === 0){
            params["time"] = "101"
        }else{
            params["time"] = "102"
        }
        params["place"] = $("#place_active .active").text();
        var price_idx = $("#price_active .active").index();
        if(price_idx === 0){
            params["price"] = "101"
        }else if(price_idx === 1){
            params["price"] = "102"
        }else{
            params["price"] = "103"
        }
        alert(states)
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + "/staff/lost_luggage/list",
            contentType: "application/json",
            dataType:"json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                if(states === "101")
                    $("#toprocess_list").empty();
                else if(states === "102")
                    $("#processing_list").empty();
                else if(states === "103")
                    $("#processed_list").empty();
                var list = data["Message"];
                $.each(list, function (index, n) {
                    var rowTr = document.createElement("a");
                    rowTr.className = "list-group-item list-group-item-action flex-column align-items-start";
                    // rowTr.id = "node" + index;
                    rowTr.tagName = "_blank";
                    // var rowTr = document.createElement('tr')
                    // rowTr.className = "node";
                    rowTr.innerHTML =
                        "<div class='d-flex w-100 justify-content-between'>" +
                            " <h5 class='mb-1'>"+ list[index]["policy_number"] + "</h5>" +
                            "<small id='time'>" + list[index]["time"] + "</small>" +
                        "</div>" +
                        "<small class='text-truncate'>" + list[index]["place"] + "</small>";
                    // rowTr.innerHTML =
                    //     "<td>" + list[index]["policy_number"]+ "</td>" +
                    //     "<td>" + list[index]["time"]+ "</td>" +
                    //     "<td>" + list[index]["place"]+ "</td>" +
                    //     "<td>" + list[index]["price"]+ "</td>";
                    if(states === "101")
                        $("#toprocess_list").append(rowTr);
                    else if(states === "102")
                        $("#processing_list").append(rowTr);
                    else if(states === "103")
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

});