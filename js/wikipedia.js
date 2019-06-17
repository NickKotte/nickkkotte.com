// var main = function(){
//EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8
//https://api.nasa.gov/planetary/apod?api_key=

$(document).ready(function(){


  var main = function(){
    $.getJSON("https://api.nasa.gov/planetary/apod?api_key=EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8", function(json){
        console.log(json);

        $(".showcase").toggle(800);
        if(json.media_type == "image"){
          $("#imgID").attr("src", json.url).delay(400).attr("class","center").slideToggle(1200);
          $("#vidID").css("display", "none");
        }
        else{
          $("#vidID").attr("src", json.url).delay(400).attr("class","center").slideToggle(1200);
          $("#imgID").css("display", "none");
        }
        $("#titleID").html(json.title);
          $("#titleID").slideToggle(1200);
        $("#descriptionID").html(json.explanation);
        $("#descriptionID").slideToggle(1200);

    });

  };
  $("h1").on("click", main);


});



//$(document).ready(main);
