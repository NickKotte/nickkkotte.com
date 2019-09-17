//private variables
//declared outside of loop to promote computing efficiency
var song; //audio variable
var song_choice; //string variable
var loading = true; //is a song loading
var angle = 0; //angle of loading animation
var angleDirection = false; //angledirection false = backwards, true = forwards
var globalpercent=0; //used to display percentage of song loaded outside of function
var fft; // new p5.fft()
var spectrum = []; //current song buffer
var drops = []; //number of particles in the background
var previous = 0; //
var amplitude; //
var center = { //
  x:0,
  y:0
};

//public varaibles for settings
var numDrops = 150;
var dropSize = 5;
var borderState = true;
var borderSize = 5;



function setup()
{
  console.log(getAudioContext());
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('canvas');

  song_choice = document.getElementById('songselector').value;
  fft = new p5.FFT(0.9, 512);

  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER);

  for(let i = 0; i < numDrops; i++)
    drops[i] = new Rain(dropSize);

  center.x = windowWidth*0.5;
  center.y = windowHeight*0.5;
}

function draw()
{
    //if user changes song, start loading animation
  if(song_choice!==document.getElementById('songselector').value)
  {
      globalpercent=0;
      if(loading==false)
      {
        document.getElementById('pauseplay').innerHTML="Play";
        song.pause();
      }
      document.getElementById('percentloaded').innerHTML='&#9737';
      song_choice=document.getElementById('songselector').value;
      song = loadSound(song_choice,loaded,errorLoading,progress);
  }

  //make loading animation
  if(loading)
  {
      background(0);
      translate(width/2, height/2);

      push();
      rotate(angle);
      if(angle>=120||angle<=0){
          angleDirection=!angleDirection;
      }
      if(angleDirection){
          angle+=0.5;
      }else{
          angle-=1;
      }

      var h = map(globalpercent,0,100,0,height/3);
      for(i = 0;i < 360; i++)
      {
        let index = 0;
        if(i<180)
        {
          index = i;
        }
        else if(i>180 && i < 360)
        {
          index = i-180;
        }

        stroke(255);
        strokeWeight(i%angle);

        radius=100;
        let x =radius* cos(i);
        let y =radius* sin(i);

        point(x,y);
      }
      pop();

      if(globalpercent!=0){
          fill(20, 255, 35);
          strokeWeight(2);
          text(globalpercent.toFixed(0)+'%',0,0);
      }

  }else{ //draw visualization

      //if chrome decides to be annoying:
      if (getAudioContext().state !== 'running') {
        text('click to start audio', width/2, height/2);
      } else {
        text('audio is enabled', width/2, height/2);
      }

      //create play/pause button:
      document.getElementById("pauseplay").onclick = function(){
          if(song.isPlaying())
          {
            document.getElementById('pauseplay').innerHTML="Play";
            song.pause();
          }
          else
          {
            document.getElementById('pauseplay').innerHTML="Pause";
            song.play();
          }
      };


      spectrum = fft.analyze();
      spectrum = spectrum.splice(10,512);

      var mWidth = spectrum[10]*2;
      if(previous === 0)
        previous = mWidth;
      else
      {
        var temp = (mWidth+previous)/2;
        mWidth = temp;
        previous = mWidth;
      }

      var j = color(map(spectrum[140]*0.2,0,256,10,256));
      background(j);


      for(let i = 0; i < drops.length; i++)
      {
        drops[i].show(spectrum[140],mWidth*0.7);
      }

      if(borderState){
          push();
          rectMode(CORNER);
          fill(0,j,0);
          rect(0,0,windowWidth,borderSize);
          rect(0,windowHeight,windowWidth,-borderSize);
          rect(0,0,borderSize,windowHeight);
          rect(windowWidth,0,-borderSize,windowHeight);
          pop();
      }


      translate(center.x,center.y);
      rotate(90);
      stroke(254,95,82, 40);
      strokeWeight(30);
      fill(254,95,82);
      ellipse(0,0,spectrum[140]*2, mWidth);



      for(i = 0;i < 360; i++)
      {
        let index = 0;
        if(i<180)
        {
          index = i;
        }
        else
        {
          index = 360-i;
        }

        if(index < 90)
        {
          index = floor(index*0.25);
        }

        //stroke(spectrum[140]*1.25,220,220);
        stroke(0);

        varradius= 0;
        amplitude = spectrum[index] + windowWidth*0.01;
        if(index < 90){
           radius= (map(amplitude, 0,256, 0, 2)*map(spectrum[0],0, 256, -40, 130));
            strokeWeight(4);
        }
        else {
           radius= map(amplitude, 0,256, 50, 200);
            strokeWeight(3);
        }
        if (radius <= 50)
           radius=50;

        let x =radius* cos(i);
        let y =radius* sin(i);

        line(radius*0.25*cos(i*8),radius*0.25*sin(i*12),x,y);


      }
      strokeWeight(6);
      fill(0);
      ellipse(0,0, 100);

      push();
      rotate(270);
      let fps = frameRate();
      fill(255);
      stroke(0);
      text("fps: " + fps.toFixed(2), 0,0);
      pop();
    }
}
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function loaded()
{
    loading=false;
    $("#pauseplay").slideDown();
    document.getElementById('pauseplay').style.display='inline-block';
}
function errorLoading(err)
{
    loading=true;
    document.getElementById('percentloaded').innerHTML=err;
}
function progress(percent)
{
    loading=true;
    if(percent*100==99)
        percent=1;
    globalpercent=percent*100;
    document.getElementById('percentloaded').innerHTML=(percent*100).toFixed(0)+'% loaded';
}

function mouseClicked()
{
  console.log('X:' + mouseX+ ' Y:' + mouseY)
  //var _time = map(mouseX, 0, width, 0, song.duration());
  //song.jump(_time);
}


//jquery

$(document).ready(function(){

    //submit form and perform actions
    $("#submit").click(function(){
        if(document.getElementById('balls').value!==""){
            drops = [];
            numDrops = document.getElementById('balls').value;
            for(let i = 0; i < numDrops; i++)
              drops[i] = new Rain(document.getElementById('dropSize').value);
        }
        borderSize=parseInt(document.getElementById('borderSize').value);



        console.log('submitted');
    });

    //auto display size range in px
    $('#dropSize').bind('input',function(){
        $('#drop_sizeRange').html(document.getElementById('dropSize').value + 'px');
    });
    $('#borderSize').bind('input',function(){
        $('#border_sizeRange').html(document.getElementById('borderSize').value + 'px');
    });

    $('#borderState').on('click',function(){
        borderState = !borderState;
        if(borderState){
            $('#borderState').css({
                "background-color":"green"
            });
            document.getElementById('borderState').innerHTML="on";
        }
        else {
            $('#borderState').css({
                "background-color":"red"
            });
            document.getElementById('borderState').innerHTML="off";
        }
    });

});
