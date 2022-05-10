var PLAY = 1;
var END = 0;
var gameState = PLAY;
var way, wayImg;
var breaking, breakingImg, breakingGroup,breakingobject;
var brick1, brick1Img,brick1Group;
var brick2, brick2Img,brick2Group;
var coins, coin, coinImg,coinGroup;
var stick, stick_running, stickImg,running;
var ground;
var invisible_ground, invisible_ground2;
var reStart,reStartImg;
var gameOver,gameOverImg;
var stoppedImg,stopped;
var greyImg,grey;


function preload() {
    wayImg = loadImage("way.png");
    breakingImg = loadImage("breakingobject.png");
    brick1Img = loadImage("brick1.png");
    brick2Img = loadImage("brick2.png");
    coinImg = loadImage("coin.png");
    stick_running = loadAnimation("stick1.png", "stick2.png");
    gameOverImg = loadImage("gameOver.png");
    reStartImg = loadImage("restart.png");
    greyImg = loadImage("grey.png");
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    background(wayImg);

    score=0;

    //way = createSprite(210, 180);
 
    way = createSprite(720, 420,370, 400);
    way.addImage("way", wayImg);
    way.scale = 2.5;
    way.velocityX = -7;
 
    grey = createSprite(100,100,50,50);
    grey.addImage("grey",greyImg);
    grey.scale=2;    

    stick = createSprite(120, 610);
    stick.addAnimation("running",stick_running);
    stick.scale = 0.5;

    invisible_ground = createSprite(720, 760, 1440, 130);
    invisible_ground.visible = false;

    invisible_ground2 = createSprite(720, 5, 1440, 50);
    invisible_ground2.visible = false;

    stick.setCollider("rectangle", 10 , 1 , 150 , 200);
    stick.debug = false;

    gameOver = createSprite(720,405);
    gameOver.addImage("gameOver",gameOverImg);
    gameOver.scale = 1;
    gameOver.visible=false;

    reStart = createSprite(720,480);
    reStart.addImage("reStart",reStartImg);
    reStart.scale = 0.5;
    reStart.visible=false;

//making groups.
    breakingGroup = new Group();
    brick1Group = new Group();
    brick2Group = new Group();
    coinGroup = new Group();    

    reStart.visible=false;
    gameOver.visible=false;
    grey.visible=false;

}

function draw() {
    
    stick.collide(invisible_ground);
    stick.collide(invisible_ground2);
    stick.visible=true;
    
    if (gameState === PLAY) {
      

        way.velocityX = -7
        

        if (way.x < 650){
            way.x = canvas.width/2;
        }

        if (keyDown("space")) {
            stick.velocityY = -30;
        }
        stick.velocityY = stick.velocityY + 2;

            spawn_breakingGroup();
            spawn_brick1Group();
            spawn_brick2Group();
            spawn_coinGroup();
           
    
        if (breakingGroup.isTouching(stick) || brick1Group.isTouching(stick) || brick2Group.isTouching(stick)){
            gameState = END;
        }

        if (coinGroup.isTouching(stick)){
            //coin.destroy(stick);
            coinGroup.destroyEach(0);
            score=score+1;
        }

      

    }
    if (gameState === END) {
        way.velocityX = 0;
        stick.velocityX  = 0;
        stick.velocityY  = 0;
        gameOver.visible = true;
        reStart.visible = true;
        brick1Group.destroyEach();
        brick2Group.destroyEach();
        coinGroup.destroyEach(); 
        breakingGroup.destroyEach();
        grey.visible=true;
        stick.visible=false;
        

        if(mousePressedOver(reStart)){
            re_set();
         }
        
    
    }
    drawSprites();
    textSize(20);
    fill("black");
    text("Score : "+ score, 40, 40);
}
function re_set(){
    gameState = PLAY;
    stick.y=610;
    reStart.visible=false;
    gameOver.visible=false;
    grey.visible=false;
    way.velocityX = -7;
    score=0;
}
 

function spawn_breakingGroup() {
    if (frameCount % 325 === 0) {

        breaking = createSprite(1460,680,40,10);
        breaking.addImage("breaking", breakingImg);
        breaking.scale = 0.5;
        breaking.x = Math.round(random(1440, 1440));
        breaking.velocityX = -7;

        breakingGroup.add(breaking);
    }


}
function spawn_brick1Group(){

     if(frameCount % 225 === 0){
        
        brick1 = createSprite(1420,200,40,10);
        brick1.addImage("brick1",brick1Img);
        brick1.scale=0.08;
        brick1.y = Math.round(random(50,600));
        brick1.velocityX = -7;

        brick1Group.add(brick1);
     }
    }
function spawn_brick2Group(){
    if(frameCount % 250 === 0){
       
        brick2 = createSprite(1420,300,40,10);
        brick2.addImage("brick2",brick2Img);
        brick2.scale = 0.3;
        brick2.y = Math.round(random(50,400));
        brick2.velocityX = -7;

        brick2Group.add(brick2);
    }
}
function spawn_coinGroup(){
    if(frameCount % 240 === 0 ){
        
        coin = createSprite(1420,300,40,10);
        coin.addImage("coin",coinImg);
        coin.scale = 0.02;
        coin.y = Math.round(random(50,400));
        coin.velocityX = -7;    

        coinGroup.add(coin);
    }

}







