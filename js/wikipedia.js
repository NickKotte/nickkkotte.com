// var main = function(){
//EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8
//https://api.nasa.gov/planetary/apod?api_key=

$(document).ready(function(){


    $("#wikipedia h1").hover(
        function(){
            $(this).css("color","#e8491d").css("fontSize","19px");
        },
        function(){
            $(this).css("color","white").css("fontSize","18px");
        }
    );


    var json;

    $.getJSON("https://api.nasa.gov/planetary/apod?api_key=EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8", function(temp){
        json = temp;
    });



    $("#wikipedia h1").on("click", function(){
        console.log(json);
        $(".showcase").toggle(800);
        if(json.media_type == "image"){
          $("#imgID").attr("src", json.url).delay(400).attr("class","center").slideToggle(1000);
          $("#vidID").css("display", "none");
        }
        else{
          $("#vidID").attr("src", json.url).delay(400).attr("class","center").slideToggle(1000);
          $("#imgID").css("display", "none");
        }

        var cr=" -";
        if(json.copyright){
            cr +=json.copyright;
        }

        $("#titleID").html(json.title+cr);
        $("#titleID").slideToggle(1000);
        $("#descriptionID").html(json.explanation);
        $("#descriptionID").slideToggle(1000);

        function scroll()
        {
            $('html, body').animate({
                scrollTop: ($('#wikipedia').offset().top)
            },1500);
        }

        setTimeout(scroll, 800);

    });



});





//$(document).ready(main);
