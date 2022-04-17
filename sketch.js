var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, zombie_running;
var heart, heart1IMG, heart2IMG, heart3IMG;
var counter = 3;

function preload() {

  zombie_running = loadAnimation("assets/z1.png", "assets/z2.png", "assets/z3.png", "assets/z4.png", "assets/z5.png", "assets/z6.png");
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  loser = loadImage("assets/shooter_1.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieIMG = loadImage("assets/z1.png")
  heart1IMG = loadImage("assets/heart_1.png")
  heart2IMG = loadImage("assets/heart_2.png")
  heart3IMG = loadImage("assets/heart_3.png")

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 500, 20);
  bg.addImage(bgImg)
  bg.scale = 1.5

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage("normal", shooterImg)
  player.addImage("loser", loser)
  player.scale = 0.7
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  //lives
  heart = createSprite(displayWidth / 2 + 750, displayHeight / 2 - 450, 50, 50);
  heart.addImage(heart3IMG);
  heart.scale = 0.5;

  zombieGroup = new Group()

}

function draw() {
  background(0);

  //player movements
  if ((keyDown("UP_ARROW") && player.y >= height / 2) || touches.length > 0) {
    player.y = player.y - 10
  }

  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 10
  }

  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 10
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 10
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  spawnZombies();

  playerDeath();

  drawSprites();

}

function spawnZombies() {

  if (frameCount % 200 === 0) {
    zombie = createSprite(width, random(height - 200, height - 150))
    zombie.addAnimation("running", zombie_running);
    zombie.scale = 1.3
    zombie.velocityX = -5
    zombieGroup.add(zombie)
  }
}

function playerDeath() {

  if (player.isTouching(zombieGroup)) {
    counter = counter - 1;
    console.log(counter);
  }

  if (counter === 2) {
    heart.changeImage(heart2IMG)
  }

  if (counter === 1) {
    heart.changeImage(heart1IMG)
  }

  if (counter <= 0) {
    player.changeImage(loser);
  }

}