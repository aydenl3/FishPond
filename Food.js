
class Food {
  constructor(x, y) {
    // This code runs once when an instance is created.
    this.x = x;
    this.y = y;
    this.active = true;
  }
  
  show(){
    if(this.active){
      fill(200,200,100)
      square(this.x,this.y,10)
    }
  }
  
  deactivate(){
    this.active = false;
  }
  activate(){
    this.active = true;
  }
  
}


