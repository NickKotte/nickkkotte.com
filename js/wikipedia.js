// var main = function(){
//EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8
//https://api.nasa.gov/planetary/apod?api_key=
var clicked = false;
var find_clicked = false;
var _json = [];

$(document).ready(function(){
  loadJson(2);

    $("#wikipedia h1").hover(
        function(){
            $(this).css("color","#e8491d").css("fontSize","19px");
        },
        function(){
            $(this).css("color","white").css("fontSize","18px");
        }
    );


    function loadJson(numTimes)
    {
      function getDate(){
        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        var loadDay = randomDate(new Date(2005, 0, 1), new Date());
        return loadDay.getFullYear() + "-" + loadDay.getMonth() + "-" + loadDay.getDate();
      }

      for(var i = 0; i<numTimes;i++)
      {
          var success = true;
          do{
            $.getJSON("https://api.nasa.gov/planetary/apod?date="+getDate()+"&api_key=EVooq5ktpP7fFB9rSffhzdChbzCvB5TA6c2zEba8", function(temp){
                _json.push(temp);
                console.log(temp);
                success = true;
              }).fail(function(){
                console.log("Failed request...");
                success = false;
              });
          }while(success==false);
      }
    }

    //loads new json
    $("#navTool").on("click", function(){
      loadJson(1);
      _json.shift();
      if(_json[1] == undefined){
        loadJson(1);
      }

      changeJson(_json[0]);
    });


    $("#navTool").hover(
        function(){
            $(this).css("background","linear-gradient(#073763, #377bab)");
        },
        function(){
            $(this).css("background","linear-gradient(#35424a, #377bab)");
        }
    );

    //toggles display on click
    $("#wikipedia h1").on("click", function(){
      changeJson(_json[0]);
      toggleDisplay(_json[0].media_type);

    });

    function toggleDisplay(media){

      $("#navTool").slideToggle(1000);
      clicked = !clicked;
      $(".showcase").toggle(800);

      if(media == "image"){
        $("#imgID").attr("class","center").slideToggle(1000);
        $("#vidID").css("display", "none");
      }
      else{
        $("#vidID").attr("class","center").slideToggle(1000);
        $("#imgID").css("display", "none");
      }

      $("#titleID").slideToggle(1000);
      $("#descriptionID").slideToggle(1000);

      function scroll()
      {
          $('html, body').animate({
              scrollTop: ($('#wikipedia').offset().top)
          },1000);
      }

      if(clicked)
      {
        setTimeout(scroll, 800);
      }

      find_clicked = !find_clicked;

    }

    function changeJson(json){

      var url = "";
      if(json.url[0] == 'w')
      {
        url = "https://"+json.url;
      }

      if(find_clicked != true)
        if(json.media_type == "image")
        {
          $("#imgID").attr("src", json.url);
          $("#vidID").css("display", "none");
        }else{
          $("#vidID").attr("src", url);
          $("#imgID").css("display", "none");
        }
      else {
        if(json.media_type == "image"){
          $("#imgID").slideToggle(300).attr("src", json.url).delay(400).slideToggle(800);
          $("#vidID").css("display", "none");
        }
        else{
          $("#vidID").slideToggle(300).attr("src", url).delay(400).slideToggle(800);
          $("#imgID").css("display", "none");
        }

      }

        var cr="";
        if(json.copyright){
            cr = " -" + json.copyright;
        }

        $("#titleID").html(json.title+cr);
        $("#descriptionID").html(json.explanation);

    }

});





//$(document).ready(main);
