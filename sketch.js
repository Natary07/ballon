var balloon, balloon_moving, position, background_img;
var database;

function preload(){

background_img=loadImage("sprites/Hot Air Ballon-01.png");

balloon_moving = loadAnimation ("sprites/Hot Air Ballon-02.png", "sprites/Hot Air Ballon-03.png", "sprites/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1000,500);

  database = firebase.database();

  balloon = createSprite(250, 200, 20, 20);
  balloon.addAnimation("moving", balloon_moving);
  balloon.scale=1;

  var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value", readPosition, showError);
    balloon.scale=0.5
    
}

function draw() {

  background(background_img); 

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
    writePosition(-10,0);
  }
  else if (keyDown(RIGHT_ARROW)){
   balloon.x=balloon.x+10;
   writePosition(+10,0);
  }
  else if (keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
    writePosition(0,-10);
    balloon.scale=balloon.scale-0.02;
  }
  else if (keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
    writePosition(0,+10);
    balloon.scale= balloon.scale+0.02
  }



  drawSprites();
}




function writePosition(x,y){
  database.ref('balloon/position').set({
      'x' : position.x + x,
      'y' : position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("There is an error in reading the database!!")
}
