
class FoodManager{
  constructor() {
    // This code runs once when an instance is created.
    this.foodlist = [];
    
  }
  
  populateList(length){
    for (let i = 0; i<=length;i++){
      let food = new Food(-1,-1);
      food.deactivate();
      this.foodlist.push(food);
    }
  }
  
  spawnFood(){
    let selected_food = null;
    for (let food of this.foodlist){
      if(food.active == false){
        selected_food = food;
        break;
      }
    }
    if (selected_food){
      selected_food.x = random(0,width);
      selected_food.y = random(0,height);
      selected_food.activate();
      return true;
    }
    else{
      return false;
    }
  }
  
  displayFood(){
    for (let food of this.foodlist){
      if(food.active){
        food.show()
      }
    }
  }
  
  executeFood(fishlist){
    for(let food of this.foodlist){

      for(let fish of fishlist){
        if(food.active){
          if(abs(food.x - fish.x) <= fish.size && abs(food.y - fish.y) <= fish.size){
             food.deactivate();
             fish.size += 5;
             if(fish.size >= fish.maxsize){
                fish.size = fish.maxsize;
                }
             //this.spawnFood();
          }
        }
      }
    }
  }
  
}


