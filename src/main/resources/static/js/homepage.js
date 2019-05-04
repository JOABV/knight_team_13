// $(document).ready(function () {
//     $("#signin-botton").on('click', function () {
//         $("#account").fadeOut();
//     })
// });

// function CheckForm() 
// { 
// 	var i=document.getElementById("username111").value;
// if (i.length == 0) { 
// alert("不能为空!"); 
// return false; 
// } 
// return true; 
// alert("不能为空!"); 
// }


function checkusrn() {
    var check = false;
    var username = document.getElementById("Username").value;
    if (username.length > 10) {
        document.getElementById("checktext1").innerHTML = " × less than 10 digits";
        check = false;
    } else {
        document.getElementById("checktext1").innerHTML = " √";
        check = true;
    }
    return check;
}

function checkpwd() {
    var check = false;
    var password = document.getElementById("Password").value;
    if (password.length < 6) {
        document.getElementById("checktext2").innerHTML = " × less than 6 digits";
        check = false;
    } else {
        document.getElementById("checktext2").innerHTML = " √";
        check = true;
    }
    return check;
}

function checkpwdc() {
    var check = false;
    var password = document.getElementById("Password").value;
    var pwdc = document.getElementById("RePassword").value;
    if (password != pwdc) {
        document.getElementById("checktext3").innerHTML = " × not the same input";
        check = false;
    } else {
        document.getElementById("checktext3").innerHTML = " √";
        check = true;
    }
    return check;
}

function validatemobile() {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var mobile = document.getElementById("UserPhone").value;
    if (mobile.length == 0) {
        document.getElementById("checktext4").innerHTML = " × cannot be empty";
        return false;
    } else if (mobile.length != 11) {
        document.getElementById("checktext4").innerHTML = " × invalid phone numbers, must be 11 digits";
        return false;
    } else if (!myreg.test(mobile)) {
        document.getElementById("checktext4").innerHTML = " × invalid phone numbers";
        return false;
    } else {
        document.getElementById("checktext4").innerHTML = " √";
        check = true;
    }
    return check;

}



function check() {
    var check = checkusrn() && checkpwd() && checkpwdc();
    return check;

}

$(document).ready(function () {
    function connect(address, params) {
        $.ajax({
            type: "POST",
            // url: "http://101.132.96.76:8080/"+address,
            url: "http://localhost:8080/" + address,
            dataType: "text",
            data: params,
            success: function (data) {
                // window.location.href = '../html-en/account.html';
            },
            error: function (jqXHR) {
                alert("wrong: " + jqXHR.status)
            }
        });
    }

    $("#user_sign_in").click(function () {
        var params = {}
        params.phone = $('#username_lo').val()
        params.password = $('#password_lo').val()
        connect("user/login", params)
    });

    $("#user_sign_up").click(function () {
        var params = {}
        params.phone = $('#username_re').val()
        params.password = $('#password_re').val()
        connect("user/register", params)
    });

});