$(document).ready(function () {
    $("#employee_lo").val(getCookie('phone_number'));

    var url = "http://localhost:8080/";
    // var url = "http://101.132.96.76:8080/"

    function connect(address, params) {
        $.ajax({
            type: "POST",
            url: url + address,
            contentType: "application/json",
            dataType:"json",
            async: false,
            data: JSON.stringify(params),
            success: function (data) {
                employee_homepage(data);
            },
            error: function (jqXHR) {
                // return jqXHR.status.toString();
            }
        });
    }

    function employee_homepage(data){
        if(data["Checkcode"] === "100") {
            window.location.href = url + "staff/employee";
        }else{
            alert(data["Checkcode"])
        }
    }

    $('.login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            employee_name: {
                validators: {
                    notEmpty: {
                    }
                }
            },
            employee_password: {
                validators: {
                    notEmpty: {
                    }
                }
            }
        }
    });

    $("#employee_login").on("click", function () {
        var bootstrapValidator = $(".login-form").data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //登录
            var params = {};
            params["phone_number"] = $('#employee_lo').val();
            params["password"] = $('#password_em').val();
            setCookie('phone_number',$('#employee_lo').val(),1); // cookie过期时间为1天。
            connect("staff/login", params);
        }else{
            //登陆失败
            $('#failModal').modal('show');
        }
    });


    // 改
    $(document).keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            $('#employee_login').click();
            //自己写判断操作
        }
    });

    //设置cookie
    function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

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