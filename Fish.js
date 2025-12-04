


class Fish{
  constructor(x, y, behavior_string,col) {
    // This code runs once when an instance is created.
    this.active = true;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.rcol = 0;
    this.bcol = 0;
    this.vision = 80;
    this.speed = 2;
    this.behav = behavior_string
    this.state = ""
    this.maxsize = 50;
    this.id = floor(random(500)*10000)
    this.goal = {x:random(0,width),y:random(0,height)};
    //console.log(this.goal)
    this.updatecol();
    this.updatestats();
  }
  
  updatestats(){
    for(let i =0; i<this.behav.length ; i++){
      let letter = this.behav[i];
      switch(letter){
        case"b":
          this.maxsize += 30;
          break
        case"s":
          this.speed += 1;
          break;
        case"v":
          this.vision += 40;
          break;
             }
      
    }
  }
  
  
  updatecol(){
    for(let i =0; i<this.behav.length ; i++){
      let letter = this.behav[i];
      switch(letter){
        case "f": 
          this.rcol += 1 * (2**i);
          break;
        case "h":
          this.rcol += 10 * (2**i);
          break;
        case "w":
          this.rcol += 60 * (2**i);
          break;
        case "m":
          this.rcol += 200 * (2**i);
          break;
        
      }
      if(i == 0){
        switch(letter){
          case "f": 
          this.bcol += 60 * (2**i);
          break;
        case "h":
          this.bcol += 200 * (2**i);
          break;
        case "w":
          this.bcol += 10 * (2**i);
          break;
        case "m":
          this.bcol += 1 * (2**i);
          break;
        }
      }
    }
    this.rcol = floor(this.rcol) % 255;
    this.rcol = floor(this.rcol) % 255;
  }
  
  
  show(){
    if(this.active){
      fill(this.rcol,30 + this.bcol,200)
      circle(this.x,this.y,this.size)
    }

  }
  
  execute(){
    //this.speed = 5 - this.size / 10 
    if(this.active){
      this.decode(this.behav)
      this.consume();
      this.keepInBounds();
    }    
  }
  
  decode(dna){
    for (let letter of dna){
      //flee
      if(letter == "f" || letter == "F"){
        let threat = this.seekFish();
        if(threat != null){
          if(threat.size >= this.size){
            //flee logic
            this.state = "f"
            this.flee(threat);
            break;
          }

        }
      }
      //wander
      else if(letter == "w" || letter == "W"){
        this.state = "w";
        this.wander();
        break;
      }
      //migrate
      else if(letter == "m"|| letter == "M"){
        this.state = "m"
        if(abs(this.x - this.goal.x) >= 10 || abs(this.y - this.goal.y) >= 10){
          this.migrate(this.goal);
        } 
        else{
        this.goal = {x:random(0,width),y:random(0,height)}
        
        }break;
      }
      //hunt
      if(letter == "h"|| letter == "H"){
        let prey = this.seekFish();
        if(prey != null){
          if(prey.size < this.size){
            //hunt logic
            this.state = "h"
            this.hunt(prey);
            break;
          }
        }
      }
      
    } 
  }
  
  consume(){
    let prey = this.seekFish();
    if(prey != null && prey.size < this.size){
      if(abs(prey.x-this.x) <= this.size && abs(prey.y-this.y) <= this.size){
      prey.active = false;
      this.size += prey.size / 2;
      if(this.size >= this.maxsize){
        this.size = this.maxsize;
      }
    }
    }

  }
  
  seekFish(){
    for(let fish of fishlist){
      if(abs(fish.x - this.x) <= this.vision && abs(fish.y - this.y) <= this.vision && fish.id != this.id){
        return(fish);
      }
    }
  }
  
  wander(){
    //this.rcol = 200
    this.x += random(-this.speed,this.speed);
    this.y += random(-this.speed,this.speed);
  }
  
  flee(threat){
    //this.rcol = 0
    if(threat.x >= this.x){
      this.x -= this.speed;
    }
    else if(threat.x <= this.x){
      this.x += this.speed;
    }
    if(threat.y >= this.y){
      this.y -= this.speed;
    }
    else if(threat.y <= this.y){
      this.y += this.speed;
    }
  }
  
  migrate(goal){
    //this.rcol = 400
    if(goal.x >= this.x){
      this.x += this.speed;
    }
    else if(goal.x <= this.x){
      this.x -= this.speed;
    }
    if(goal.y >= this.y){
      this.y += this.speed;
    }
    else if(goal.y <= this.y){
      this.y -= this.speed;
    }
  }
  
  hunt(prey){
    
    if(abs(prey.x-this.x) <= this.size && abs(prey.y-this.y) <= this.size){
      prey.active = false;
      this.size += prey.size / 2;
      if(this.size >= this.maxsize){
        this.size = this.maxsize;
      }
    }
    
    if(prey.x >= this.x){
      this.x += this.speed;
    }
    else if(prey.x <= this.x){
      this.x -= this.speed;
    }
    if(prey.y >= this.y){
      this.y += this.speed;
    }
    else if(prey.y <= this.y){
      this.y -= this.speed;
    }
  }
  
  breed(list,traits){
    this.active = false;
    
    for(let i = this.size; i > 0; i -= 20){
      let mutation = random(0,10)
      let child = new Fish(this.x +=20,this.y += 20,this.behav,this.rcol)
      if(floor(mutation) == 1){
        //console.log("MUTATE");
        for(let letter of child.behav){
          let rngletter = "";
          let rng = random(0,100);
          if(traits){
            let mrng = floor(rng) % 6;
       
            switch(mrng){
              case 0:
                rngletter = "f"
                break;
              case 1:
                rngletter = "m"
                break;
              case 2:
                rngletter = "w"
                break;
              case 3:
                rngletter = "h"
                break;
              case 4:
                rngletter = "s"
                break;
              case 5:
                rngletter = "b"
                break;
            }
          }
          else{
              
              let mrng = floor(rng) % 4;
              switch(mrng){
                case 0:
                  rngletter = "f"
                  break;
                case 1:
                  rngletter = "m"
                  break;
                case 2:
                  rngletter = "w"
                  break;
                case 3:
                  rngletter = "h"
                  break;
            }

          }
          
          if(rng <= 70){
             child.behav = child.behav.slice(-(child.behav.length - 1))
             child.behav = rngletter + child.behav
          }
          else if (rng <= 85){
            child.behavs = rngletter + child.behav
          }
          else{
            child.behav = child.behav.slice(-(child.behav.length - 1))
          }
        }
      }
      else{
        //console.log("Mutation Skipped")
        //console.log(child.behav)
      }
      child.updatecol();
      list.push(child);
      //console.log("I MADE CHILD")
      
    }
  }
  
  
  keepInBounds(){
    if(this.x >= width){
      this.x = width;
    }
    if(this.x <= 0){
      this.x = 0
    }
    if(this.y >= height){
      this.y = height;
    }
    if(this.y <= 0){
      this.y = 0
    }
  }
}

