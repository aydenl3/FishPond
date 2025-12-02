let fishlist = [];
let fishspawn = [];
let gameFood
let clock = 0;
let clockBreedCD = 500;
let clockFoodCD = 10;
let currInput = "";
let allowTraits = false;

function setup() {
  frameRate(200);
  createCanvas(700, 800);
  strokeWeight(0)
  
  //let fishA = new Fish(random(0,width),random(0,height),"fw",30)
  //let fishB = new Fish(random(0,width),random(0,height),"fmw",100)
  //let fishC = new Fish(random(0,width),random(0,height),"fmw",100)
  //let fishD = new Fish(random(0,width),random(0,height),"mf",210)
  //let fishE = new Fish(random(0,width),random(0,height),"hfm",510)
  //fishlist.push(fishA);
  //fishlist.push(fishB);
  //fishlist.push(fishC);
  //fishlist.push(fishD);
  //fishlist.push(fishE);
  
  //console.log(fishlist)
  
  gameFood = new FoodManager();
  gameFood.populateList(80);
  for(let i =0; i<20;i++){
      gameFood.spawnFood();
  }
  //console.log(gameFood)
  
  let button = createButton('add fish');
  button.position(0, height - 40);
  button.mousePressed(addFish);
  
  let allowButton = createButton('allow traits');
  allowButton.position(250, height - 20);
  allowButton.mousePressed(toggleAllowTraits);
  
  let clearbutton = createButton('clear');
  clearbutton.position(400, height - 20);
  clearbutton.mousePressed(wipe);
  
  inputbox = createInput('');
  inputbox.position(0, height - 20);

  // Call repaint() when input is detected.
  inputbox.input(updateCurrInput);
  
  
}

function draw() {
  //currTime = millis() - startTime;
  //fill()
  background(80,60);
  for(let i = 0; i < fishlist.length;i+=1){
    let fish = fishlist[i]
    fish.show();
    fish.execute();
    //console.log(fish.behav);
    if(fish.active == false){
      fishlist.splice(i,1);
    }
  }
  clock += 1;
  breedLogic();
  foodLogic();
  gameFood.displayFood();
  gameFood.executeFood(fishlist);
  displayHUD();

}



function toggleAllowTraits(){
  allowTraits = !allowTraits;
  console.log(allowTraits);
}


function wipe(){
  fishlist = [];
}

function addFish(){
  let newFish = new Fish(random(0,width),random(0,height),currInput);
  fishlist.push(newFish);
  newFish.updatecol
  
}


function updateCurrInput(){
  msg = inputbox.value();
  currInput = msg;
}


function displayHUD(){
  let uniquebehavs = [];
  let hudlist = [];
   for(let fish of fishlist){
     if(!uniquebehavs.includes(fish.behav)){
        uniquebehavs.push(fish.behav)
        hudlist.push(fish)
      }
   }
  for(let i = 0; i < hudlist.length; i++){
    fill(0,0,0)
    text(hudlist[i].behav, 600, height - 50*i -50);
    fill(hudlist[i].rcol,30 + hudlist[i].bcol,200);
    circle(550,height - 50*i - 50,30);
  }    
  if(allowTraits){
      fill(20,200,100)
  }
  else{
      fill(200,0,0)
  }
  square(340,height -20,20)
}




function foodLogic(){
  if(clock % clockFoodCD == 0){
    gameFood.spawnFood();
  }
}


function breedLogic(){
  if(clock % clockBreedCD == 0){
    console.log(fishlist)
    console.log(clock)
    for(let i = 0; i < fishlist.length;i+=1){
      let fish = fishlist[i]
      if(fish.size < 35){
        console.log("Didnt breed")
        console.log(fish.size)
        //console.log(fish.col)
        fish.active = false;

      }
      else{
        fish.breed(fishspawn,allowTraits);
      }
      console.log(fishlist)
  }
    for(let i = 0; i<fishspawn.length;i+=1){
      let fish = fishspawn[i];
      fishlist.push(fish)
    }
    fishspawn = [];
  }
}


