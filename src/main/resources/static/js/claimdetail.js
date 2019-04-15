$(document).ready(function () {

    $("#viewFileButton").click(function () {
        var text = $(this).text();
        if(text=="Hide"){
            $("#fileImage").hide();
            $(this).text("View File");
        }else{
            $("#fileImage").show();
            $(this).text("Hide");
        }
    });

    $("#resultDropdown").change(function(){
        var options=$(this).children("option:selected");
        if(options.val()=="3"){
            $("#more_info").show();
        }else{
            $("#more_info").hide();
        }
    });
});