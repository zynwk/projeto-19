var spaceImg, space;
var naveImg, nave, naveGroup;
var meteoroImg, meteoro, meteoroGroup;
var tiroImg, tiro, tiroGroup;
var dificuldade;
var score = 0;
var gameState = "play";
var edges;

function preload(){
  spaceImg = loadImage("starblast fundo.png");
  naveImg = loadImage("starblast_ship.png");
  meteoroImg = loadImage("meteoro.png");
  tiroImg = loadImage("tiro.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  space = createSprite(windowWidth/2,windowHeight/2);
  space.addImage("space",spaceImg);
  space.scale = 3.2;
  edges = createEdgeSprites();
  

  naveGroup = new Group();
  meteoroGroup = new Group();
  tiroGroup = new Group();

  nave = createSprite(windowWidth/2,(windowHeight-60));
  nave.scale = 1;
  nave.addImage("nave",naveImg);
}

function draw() {
  background(0);
  space.velocityY = 0.2;
  space.velocityX = 0.6;

  if(space.x>(windowWidth/2)+100){
    space.x = windowWidth/2;
    space.y = windowHeight/2;
  }


  if (gameState === "play"){
    textSize(50);

    if(keyDown("left_arrow")||keyDown("A")){
      nave.x = nave.x - 13;
    }

    if(keyDown("right_arrow")||keyDown("D")){
      nave.x = nave.x + 13;
    }

    if(keyDown("space")){
     atirar();
    }

    if(nave.isTouching(meteoroGroup) || meteoroGroup.isTouching(edges[3])) {
      nave.destroy();
      gameState = "end"
    }
    tiroGroup.overlap(meteoroGroup, function(sprite1,sprite2) {
      sprite1.remove();
      sprite2.remove();
      score = score+5;
      dificuldade = dificuldade - 0.001;
    })
    
    spawnMeteoros();
    drawSprites();
    textSize(30);
    text("score: "+score,windowWidth-200,70);
    
  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo",230,250);
    score = 0;
    meteoroGroup.destroy();
    tiroGroup.destroy();
  }
}

function spawnMeteoros() {
  if(frameCount % (60) === 0){
    meteoro = createSprite(200,20);
    meteoro.addImage(meteoroImg);

    meteoro.x = Math.round(random(50,windowWidth-50));
    meteoro.velocityY = 2;
    meteoro.lifetime = 800;

    nave.depth = meteoro.depth;
    nave.depth +=1;

    meteoroGroup.add(meteoro);
  }
}
function atirar() {
    tiro = createSprite(nave.x,windowHeight-50);
    tiro.addImage(tiroImg);
    tiro.velocityY = -10;
    tiro.lifetime = 100;
    tiro.rotation = 90
    tiroGroup.add(tiro);
}