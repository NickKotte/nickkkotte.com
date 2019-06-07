//FFT //overflow: hidden;
var song;
var fft;
var button;
var spectrum = [];
var amp;
var loc = 0;
var drops = [];
var previous;
var center = {
  x:0,
  y:0
};
function preload()
{
  song = loadSound("./projects/Music/Shipwreck.mp3", loaded);
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  fft = new p5.FFT(0.8, 512);
  // colorMode(HSB);
  angleMode(DEGREES);
  amp = new p5.Amplitude();
  noFill();
  for(let i = 0; i < 150; i++)
    drops[i] = new Rain();
  previous = 0;
  center.x = windowWidth/2;
  center.y = windowHeight/2;
}

function draw()
{
  button.mousePressed(toggleSong);

  var level = amp.getLevel();
  level = map(level, 0,1, 0,200);
  spectrum = fft.analyze();
  spectrum = spectrum.splice(10,512);

  background(0);

  var mWidth = spectrum[10]*2;
  if(previous === 0)
    previous = mWidth;
  else
  {
    var temp = (mWidth+previous)/2;
    mWidth = temp;
    previous = mWidth;
  }


  for(let i = 0; i < drops.length; i++)
  {
    drops[i].show(level,mWidth*0.7);
  }


push();
  translate(center.x,center.y);
  rotate(90);
  stroke(254,95,82, 40);
  strokeWeight(30);
  fill(254,95,82);
  ellipse(0,0,spectrum[140]*2, mWidth);


  // strokeWeight(1);
  // for(let i = 0; i < 512; i++)
  // {
  //   if(i < 90)
  //     stroke(255,0,0);
  //   else if(i < 180)
  //     stroke(255,255,0);
  //   else if(i < 270)
  //     stroke(255,0,255);
  //   else if(i < 360)
  //     stroke(0,255,255);
  //   line(i, windowHeight, i, windowHeight-spectrum[i]);
  // }

//beginShape();
var high = 0;
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
      index = floor(index/3);
      high = i+270;
    }


    var amplitude = spectrum[index];
    amplitude += windowWidth*0.01;

    var angle = map(loc, -512,512, 0,180)
    strokeWeight(3);
    let r = map(amplitude, 0,256, 60, 200);
    //fill(map(amplitude,0,256, 100,255),255,255);

    let x = r * cos(i);
    let y = r * sin(i);

    stroke(0);
    line(r/4*cos(i*8),r/4*sin(i*-16),x,y);

  }
pop();
//endShape(CLOSE);

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
