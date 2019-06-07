class Rain {
    constructor()
    {
      this.x = random(0,windowWidth);
      this.y = 0;
      this.add = 0;
      this.speedx= random(1,15);
      this.speedy= random(5, windowWidth)
      this.radius = map(this.speedx, 1,15, 2,8);
      this.center = {
        x:windowWidth/2,
        y:windowHeight/2
      };
      angleMode(DEGREES);
    }

    show(amp, repelingForce)
    {
      push();

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

      amp = map(amp, 0,200, 100,255);
      strokeWeight(4);
      stroke(255, 40);
      fill(250);
      this.add = 0;

      //var d = sqrt(pow((this.x-this.center.y),2)+pow((this.y-this.center.x),2));
      var d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
      while(d < repelingForce)
      {
        if(this.y >= this.center.x)
        {
          this.y+=1;
        }
        else
        {
          this.y-=1;
        }

        fill(255,0,0,255);
        this.add = 4;
        d = abs(this.x-this.center.y)+abs(this.y-this.center.x);
        //d = sqrt(pow((this.x-this.center.y),2)+pow((this.y-this.center.x),2));
      }
      ellipse(this.y,this.x,this.radius+this.add);
      pop();
    }
  }
