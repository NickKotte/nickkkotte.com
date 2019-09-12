//FFT //overflow: hidden;
var song;
var song_choice;
var loading = true;
var angle = 0;
//angledirection false = backwards, true = forwards
var angleDirection = false;
var globalpercent=0;

var fft;
var spectrum = [];
var amp;
var loc = 0;
var drops = [];
var previous;
var amplitude;
var rote = 90;
var center = {
  x:0,
  y:0
};





function preload()
{
  song_choice = document.getElementById('songselector').value;
}

function setup()
{
  console.log(getAudioContext());
  createCanvas(windowWidth,windowHeight);
  fft = new p5.FFT(0.9, 512);
  // colorMode(HSB);
  angleMode(DEGREES);
    rectMode(CENTER);
  amp = new p5.Amplitude();
  noFill();
  for(let i = 0; i < 150; i++)
    drops[i] = new Rain();
  previous = 0;
  center.x = windowWidth*0.5;
  center.y = windowHeight*0.5;
}

function draw()
{
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

        r=100;
        let x = r * cos(i);
        let y = r * sin(i);

        point(x,y);
      }
      pop();

      if(globalpercent!=0){
          stroke(20, 255, 35);
          text(globalpercent.toFixed(0)+'%',0,0);
      }

  }else{

      textAlign(CENTER);

      if (getAudioContext().state !== 'running') {
        text('click to start audio', width/2, height/2);
      } else {
        text('audio is enabled', width/2, height/2);
      }
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

      var level = amp.getLevel();
      level = map(level, 0,1, 0,200);
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


      translate(center.x,center.y);
      if(level > 80)
        rotate(rote+0.1);
      if(level <= 80)
        rotate(rote-0.1)
      // rotate(90);
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

        var r = 0;
        amplitude = spectrum[index] + windowWidth*0.01;
        if(index < 90){
            r = (map(amplitude, 0,256, 0, 2)*map(spectrum[0],0, 256, -40, 130));
            strokeWeight(4);
        }
        else {
            r = map(amplitude, 0,256, 50, 200);
            strokeWeight(3);
        }
        if (r <= 50)
            r =50;

        let x = r * cos(i);
        let y = r * sin(i);

        line(r*0.25*cos(i*8),r*0.25*sin(i*12),x,y);


      }
      strokeWeight(6);
      fill(0);
      ellipse(0,0, 100);
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
  if(mouseY > 0)
  {
    var _time = map(mouseX, 0, width, 0, song.duration());
    song.jump(_time);
  }
}
