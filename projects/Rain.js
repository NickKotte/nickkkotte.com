class Rain {
    constructor()
    {
      this.x = random(0,windowWidth);
      this.y = 0;
      this.add = 0;
      this.speedx= random(5,10);
      this.speedy= random(5, windowWidth)
      this.radius = map(this.speedx, 5, 15, 4,6);
      this.center = {
        x:windowWidth*0.5,
        y:windowHeight*0.5
      };
      angleMode(DEGREES);
    }

    show(amp, repelingForce)
    {

      //Move X
      if(this.x > windowWidth || this.x < -20)
      {
        this.speedy= random(5, windowWidth);
        this.x = 0;
      }
      this.x += this.speedx;

      //Move Y
      if(this.y > windowHeight|| this.y < -20)
      {
        this.y = 0;
      }
      this.y = 5*sin(this.x) + this.speedy;

      amp = map(amp, 0,200, 0,255);
      strokeWeight(0);
      stroke(250);
      fill(255);

      if(this.x < center.y)
      {
          fill(amp,0,map(this.x,0,center.y, 0,150));
      }
      else {
          fill(amp,0,map(this.x,center.y,windowHeight, 150,0));
      }


      this.add = 0;

      //var d = sqrt(pow((this.x-this.center.y),2)+pow((this.y-this.center.x),2));

      if(repelingForce > 100)
      {
          var d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
          while(d < repelingForce)
          {
            if(this.y >= this.center.x)
            {
              this.y+=5;
            }
            else
            {
              this.y-=5;
            }

            //fill(255,0,0,255);
            d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
            //d = sqrt(pow((this.x-this.center.y),2)+pow((this.y-this.center.x),2));
          }
      }
      ellipse(this.y,this.x,this.radius);
    }
  }
