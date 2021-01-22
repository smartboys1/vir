var canvas;
var dog,happydog,dogImg,happydogImg;
var foodStock,foodS;
var database;

function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png");
  happydogImg=loadImage("images/happydog.png");
}

function setup() {
  canvas=createCanvas(500,500);
  dog=createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15
  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImg);
}
  drawSprites();
  
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}

function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



