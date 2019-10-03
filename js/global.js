
$(document).ready(function(){

    if(document.getElementById("logo") !== null){
        $('#logo').css('top', document.getElementById("header").offsetHeight);
        $('#body').css('position', "absolute");
        $('#body').css('margin-top', document.getElementById("logo").offsetHeight-110);
        $('#footer').css('position', "absolute");
    }else{
        $('#body').css('margin-top', document.getElementById("header").offsetHeight);
    }

    $( window ).resize(function() {
        console.log("height: " + document.getElementById("header").offsetHeight);
        $('#body').css('margin-top', document.getElementById("header").offsetHeight);
    });


});
