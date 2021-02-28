var man,manShooting,manAnim;
var bgImg,vImg,bgImg,bulletImg,bulletSound;
var bulletGrp,VirusGrp,maskGrp;
var gameState = "play";



 function preload(){

    manAnim = loadAnimation("JK_P_Gun__Idle_000.png","JK_P_Gun__Idle_001.png","JK_P_Gun__Idle_002.png","JK_P_Gun__Idle_003.png","JK_P_Gun__Idle_004.png","JK_P_Gun__Idle_005.png","JK_P_Gun__Idle_006.png","JK_P_Gun__Idle_007.png","JK_P_Gun__Idle_008.png","JK_P_Gun__Idle_009.png");
    manShoot = loadAnimation("JK_P_Gun__Attack_000.png","JK_P_Gun__Attack_001.png","JK_P_Gun__Attack_002.png","JK_P_Gun__Attack_003.png","JK_P_Gun__Attack_004.png","JK_P_Gun__Attack_005.png","JK_P_Gun__Attack_006.png","JK_P_Gun__Attack_007.png","JK_P_Gun__Attack_008.png","JK_P_Gun__Attack_009.png");
    bgImg = loadImage("b.png");
    vImg = loadImage("v.png");
    maskImg= loadImage("mask.png");
    bulletImg = loadImage("bullet-8471.png");
    bulletSound = loadSound("bullet.mp3");

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    bulletGrp = new Group();
    VirusGrp  = new Group();
    maskGrp   = new Group();

    man = createSprite(width-1300,height-170,50,50);
    man.addAnimation("idle",manAnim);
    man.addAnimation("shooying",manShoot);
    man.scale = 0.3;
    
}

function draw() {
    
    background(bgImg);
    virus();
    mask();

    man.velocityY = 0;

    if(keyWentDown("Space")){
    man.changeAnimation("shooying",manShoot);
    bulletSound.play();
    shoot();
    }else{
    man.changeAnimation("idle",manAnim);
    }

    if(keyDown("UP_ARROW")){
    man.velocityY = -10
    }

    if(keyDown("DOWN_ARROW")){
    man.velocityY = 10
    }

    if(bulletGrp.isTouching(VirusGrp)){
    bulletGrp.destroyEach();
    VirusGrp.destroyEach();
    }

    drawSprites();

} 

function virus(){

    if (frameCount % 160 === 0){
    var virus = createSprite(1900,600,40,10);
    virus.y = Math.round(random(80,900));
    virus.addImage(vImg);
    VirusGrp.add(virus);
    virus.scale = 0.041;
    virus.velocityX = -8;
    }

}

function mask(){
    if (frameCount % 260 === 0) {
    var mask = createSprite(1900,600,40,10);
    //virus.y = Math.round(random(80,120));
    mask.addImage(maskImg);
    maskGrp.add(mask);
    mask.scale = 0.02;
    mask.velocityX = -8;
    }
    
}

function shoot(){
    bullet = createSprite(man.x+80,man.y+27);
    bullet.addImage(bulletImg);
    bullet.scale = 0.035;
    bullet.velocityX = 60;
    bulletGrp.add(bullet);
}

