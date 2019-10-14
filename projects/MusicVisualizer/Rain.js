class Rain {
    constructor(radius)
    {
      this.x = random(0,windowWidth);
      this.y = 0;
      this.speedx= random(5,10);
      this.speedy= random(5, windowWidth/2)
      this.radius = parseInt(radius);
      this.center = {
        x:windowWidth*0.5,
        y:windowHeight*0.5
      };
      angleMode(DEGREES);
    }

    show(repelingForce, col)
    {

      //Move X
      if(this.x > windowHeight)
      {
        this.x = 0;
      }
      this.x += this.speedx;

      //Move Y
      // if(this.y > windowHeight || this.y < -20)
      // {
      //   this.y = 0;
      // }
      this.y = this.speedy;
      strokeWeight(0);
      stroke(250);

      // if(this.x < center.y)
      // {
      //     fill(amp,0,map(this.x,0,center.y, 0,250));
      // }
      // else {
      //     fill(amp,0,map(this.x,center.y,windowHeight, 250,0));
      // }

      fill(col,0,120);


      // if(repelingForce > 100)
      // {
      //     var d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
      //     while(d < repelingForce)
      //     {
      //       if(this.y >= this.center.x)
      //       {
      //         this.y+=5;
      //       }
      //       else
      //       {
      //         this.y-=5;
      //       }
      //
      //       //fill(255,0,0,255);
      //       d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
      //       //d = sqrt(pow((this.x-this.center.y),2)+pow((this.y-this.center.x),2));
      //     }
      // }
      ellipse(this.y,this.x,this.radius);
      ellipse(this.y+(center.x),this.x,this.radius);
    }
  }
