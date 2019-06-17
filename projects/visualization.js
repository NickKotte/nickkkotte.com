//FFT //overflow: hidden;
var song;
var fft;
var button;
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

//3652272011
function preload()
{
  console.log(getAudioContext());
  song = loadSound("./projects/Music/Shipwreck.mp3", loaded);
}

function setup()
{
  console.log(getAudioContext());
  createCanvas(windowWidth,windowHeight);
  fft = new p5.FFT(0.9, 512);
  // colorMode(HSB);
  angleMode(DEGREES);
  amp = new p5.Amplitude();
  noFill();
  for(let i = 0; i < 300; i++)
    drops[i] = new Rain();
  previous = 0;
  center.x = windowWidth*0.5;
  center.y = windowHeight*0.5;
}

function draw()
{
  textAlign(CENTER);

  if (getAudioContext().state !== 'running') {
    text('click to start audio', width/2, height/2);
  } else {
    text('audio is enabled', width/2, height/2);
  }
  button.mousePressed(toggleSong);

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
  var j = color(map(spectrum[140]*0.5,0,256,10,256));
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

function loaded()
{
  button = createButton("Play");
}

function toggleSong()
{
  if(song.isPlaying())
  {
    button.html("Play");
    song.pause();
  }
  else
  {
    button.html("Pause");
    song.play();
  }
}

function mouseClicked()
{
  if(mouseY > 0)
  {
    var _time = map(mouseX, 0, width, 0, song.duration());
    song.jump(_time);
  }
}
