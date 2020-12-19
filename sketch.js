var towerImage , tower ;
var door , doorImg , doorsGroup;
var climber , climberImg , climbersGroup;
var ghost , ghostImg ;
var invisibleBlock , invisibleBlockGroup;

var gameState = "PLAY";

function preload (){
  towerImage = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup (){
  
  createCanvas(600,600);
  spookySound.loop();
  
  //to create our tower
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
}

function draw (){
  background (0);
  
  if(gameState === "PLAY"){
    
  
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y >600 ){
    ghost.destroy();
    gameState = "END";
  }
    
  
  //to make our tower repeat itself after 400
  if(tower.y>400){
    tower.y = 300;
  }
  spawnDoors();
  
  
  
  
  drawSprites();
  }
 if(gameState === "END"){
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("GAME OVER",230,250);
 }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    
    climber.lifetime = 800;
    climbersGroup.add(climber);

    door.lifetime = 800;
    doorsGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    
  }
}