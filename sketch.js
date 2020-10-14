var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50, 350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.shapeColor = "brown";
  ground.velocityX = -3;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  if(keyDown("space")){
    monkey.velocityY = -8;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(ground.x < 0){
    ground.x = ground.width/2; 
  }

 if(monkey.isTouching(foodGroup)){
   foodGroup.destroyEach();
   score = score + 1;
 }
  
  monkey.collide(ground);
  
 spawnFood();
 spawnObstacles();

 if(obstacleGroup.isTouching(monkey)){
   ground.velocityX = 0;
   monkey.velocityY = 0;
   obstacleGroup.setVelocityXEach(0);
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   foodGroup.setLifetimeEach(-1);
    }
   
   drawSprites();

   stroke("white");
   textSize(20);
   fill("white");
   text("score" + score, 400, 50);
   
   stroke("black");
   textSize(20);
   fill("black");
   survivalTime = Math.ceil(frameCount/frameRate());
   text("Survival Time: " + survivalTime, 100, 20);

   }

function spawnFood(){
   if(frameCount % 300 === 0){
    banana = createSprite(400, 100, 20, 20);
    banana.addImage(bananaImage);
    banana.y = random(100, 150);
    banana.scale = 0.1;
    banana.velocityX = -2;
    banana.lifetime = 200;
    foodGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400, 330, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    monkey.depth = obstacle.depth + 1;
    //obstacle.debug = true;
    obstacle.setCollider("circle", 00, 00, 200)
  }
}