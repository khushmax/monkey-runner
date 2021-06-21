
var monkey , monkey_running
var banana ,bananaImage, obstacles, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var bg,bgImage;
var survivalTime=0;
var eatenbananas=0;
var burp
var reset,resetImage
var touching=0;
var restart,restartImage;
var refresh,refreshImage;
gameState="play";
function preload(){
 refreshImage=loadImage("re.png")
   monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  restartImage=loadImage("Button!!.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage=loadImage("46af74fb76c795f87c706e197670d186.jpg")
  burp=loadSound("Burp-A2-www.fesliyanstudios.com-1.mp3")
  
  resetImage=loadImage("arrow-sign-reset-icon-circle-button-vector-13928452-removebg-preview.png")
}


//setting up
function setup() {
    var canvas=createCanvas(700,400);
 
  ground=createSprite(700,390,700,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.shapeColor="black";
  bg=createSprite(350,200,700,400)
  bg.addImage("white",bgImage)
  bg.scale=0.8;
  bg.velocityX=-4;
   refresh=createSprite(350,200,20,20);
  refresh.visible=false;
  refresh.addImage("abcdefg",refreshImage);
  restart=createSprite(350,200,20,20);
  restart.visible=false;
  restart.addImage("hello",restartImage)
  monkey=createSprite(80,400,20,20);
  monkey.addAnimation("sahasra",monkey_running);
  monkey.scale=0.2;
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  reset=createSprite(200,200,20,20);
  reset.addImage("sxs",resetImage);
  reset.visible=false;
  reset.scale=0.2;
}


function draw() {
  if(gameState==="play"){
    survivalTime=Math.ceil(frameCount/frameRate());
  }
background("white");
  if(ground.x<100){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&&monkey.y>100&&gameState==="play") {
    monkey.velocityY = -12;
   
  }
  if(bg.x<100){
    bg.x=200
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground)
  spawnbananas();
  spawnObstacles();
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+100;
    eatenbananas=eatenbananas+1;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
  monkey.scale=monkey.scale/1.5;
    gameState="medium";
    touching=touching+1;
  }
  
  
  if(monkey.y>280){
    monkey.y=280;
  }
  if(gameState==="medium"){
    if(touching===2){
      gameState="end";
    }
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    bg.velocityX=0;
    
  }
  
  if(gameState==="medium"&&mousePressedOver(restart)){
    gameState="play";
    restart.destroy();
    bg.velocityX=-4;
  }  
 
 if(gameState==="end"){
   refresh.visible=true;
      bg.velocityX=0;
      ground.velocityX=0;
      monkey.destroy();
      monkey.velocityX=0;
      monkey.velocityY=0;
      bananaGroup.destroyEach();
     obstaclesGroup.destroyEach();
   survivalTime=survivalTime+0;
    }
   
  
  drawSprites();
  

  fill("black");
  text("your score:"+score,300,30);
 
  text("survivalTime:"+survivalTime,300,50);
  text("No.of bananas eaten:"+eatenbananas,270,70);
}
function spawnbananas(){
  if(World.frameCount%80===0){ 
    banana=createSprite(700,200,20,20);
    banana.scale=0.1;
   
    r=Math.round(random(1,4)); 

    if(r == 1) {
      banana.addImage(bananaImage);
    } 
    else if (r == 2){
      banana.addImage(bananaImage)
    } 
    else if (r == 3){
      banana.addImage(bananaImage)
    } 
    else if (r == 4){
      banana.addImage(bananaImage)
    }

    banana.y=Math.round(random(150,200))
    bananaGroup.add(banana); 
    banana.velocityX=-(5+score/100);
}

}
function spawnObstacles()
{
  if(World.frameCount%200===0){ 
    obstacles=createSprite(700,200,20,20);
    obstacles.scale=0.2;
    obstacles.addImage(obstacleImage);
   

    obstacles.y=Math.round(random(280,300))
    obstaclesGroup.add(obstacles); 
    obstacles.velocityX=-(5+score/100);
    obstacles.lifetime=200;
  }

}
