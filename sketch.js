var PLAY = 1;
var END = 0;
var gameState = PLAY;
var lives = 5
var runner, runner_running, runner_collided;
var ground, invisibleGround, groundImage;
var heart1,heart2,heart3,heart4,heart5,heartImg;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var x=x;
var y=y;


function preload()
{
  runner_running =   loadAnimation("jog1.png","jog2.png");
  runner_collided = loadAnimation("jog2.png");
  groundImage = loadImage("bgbgbg.jpg");
  obstacle1 = loadImage("banana.png");
  obstacle2 = loadImage("apple.png");
  obstacle3 = loadImage("watermelon.png");
  obstacle4 = loadImage("cherry.png");
  obstacle5 = loadImage("pear.png");
  obstacle6 = loadImage("pear.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  heartImg = loadImage("heart.png");

}

function setup() 
{
  createCanvas(600, 200);
  
  score = 0;

  ground = createSprite(100,180,2000,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.addImage(groundImage)
  ground.scale = 1;

  runner = createSprite(50,190,20,50);
  runner.addAnimation("running", runner_running);
  runner.addAnimation("collided",runner_collided);
  runner.scale = 0.1;

  heart1 = createSprite(180,30);
  heart1.addImage(heartImg);
  heart1.scale = 0.1;
  heart2 = createSprite(240,30);
  heart2.addImage(heartImg);
  heart2.scale = 0.1;
  heart3 = createSprite(300,30);
  heart3.addImage(heartImg);
  heart3.scale = 0.1;
  heart4 = createSprite(360,30);
  heart4.addImage(heartImg);
  heart4.scale = 0.1;
  heart5 = createSprite(420,30);
  heart5.addImage(heartImg);
  heart5.scale = 0.1;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,100);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

 

}

function draw() 
{

  background("jungle.png");
   

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    runner.changeAnimation("running", runner_running);
    
    if(keyDown("space") && runner.y >= 120) {
      runner.velocityY = -12;
    }
  
    runner.velocityY = runner.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    runner.collide(invisibleGround);

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(runner)){
        obstaclesGroup.destroyEach();
        lives = lives-1
        heartLives();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    score = 0
   
    ground.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

  
    runner.changeAnimation("collided",runner_collided);
    

    obstaclesGroup.setLifetimeEach(-1);

    
    if(mousePressedOver(restart)) {
      reset();
      

    }
  }
  else if(gameState == "WIN"){
    text("YOU WIN",300,50)
   gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    
 
    runner.changeAnimation("collided",runner_collided);
    

    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
      
    }
  }
 
    
  drawSprites();
  fill("red");
  
  text("Score: "+ score, 500,50);  
  
}


function reset()
{
  gameState = PLAY;
  lives = 5;
  gameOver.visible = false;
  restart.visible = false;

  score = 0;
  obstaclesGroup.destroyEach();

  
}

function spawnObstacles()
 {
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(600,165,10,40);

    obstacle.velocityX = -(6 + 3*score/100);
    

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
       
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.scale = 0.1;
    obstaclesGroup.add(obstacle);
  }
}

function heartLives() 
{
  if (lives == 4) 
  {
    heart1.visible = false;
    console.log("1");
  }
  if (lives == 3) 
  {
    heart2.visible = false;
    console.log("2");
  }
  if (lives == 2)
   {
    heart3.visible = false;
    console.log("3");
  }
  if (lives == 1) 
  {
    heart4.visible = false;
    console.log("4");
  }
  if (lives == 0) 
  {
    heart5.visible = false;
    gameState = END
  }
}

