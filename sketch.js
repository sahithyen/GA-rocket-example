/*
 * Sahithyen Kanganayagam (mail@sahithyen.com)
 * Original author: Daniel Shiffman
 * Forked from https://github.com/RainbowCoder/Video-Lesson-Materials
 */


var
  images = {},
  population,
  lifeSpan = 200,
  lifeP,
  count = 0,
  maxforce = 0.8,
  target,
  obstacle,
  start;

function preload() {
  images.GARocket = loadImage("img/GARocket.png");
  images.GARocketFinished = loadImage("img/GARocketFinished.png");
  images.GARocketDestroyed = loadImage("img/GARocketDestroyed.png");
  images.GAEarth = loadImage("img/GAEarth.png");
  images.GAMars = loadImage("img/GAMars.png");
}

function setup() {
  createCanvas(1080, 300);

  start = {
    position: createVector(
      width * 0.1,
      height / 2
    ),
    width: 100,
    height: 100
  };
  target = {
    position: createVector(
      width * 0.9,
      height / 2
    ),
    width: 50,
    height: 50
  };
  obstacle = {
    position: createVector(
      width / 2 - 50,
      height / 2 - 50
    ),
    width: 100,
    height: 100
  };

  population = new Population();
  lifeP = createP();
}

function draw() {
  background(0);

  // Draw start
  imageMode(CENTER);
  image(
    images.GAEarth,
    start.position.x,
    start.position.y,
    start.width,
    start.height
  );

  // Draw target
  imageMode(CENTER);
  image(
    images.GAMars,
    target.position.x,
    target.position.y,
    target.width,
    target.height
  );

  // Update and draw population of rockets
  population.run();

  // Draw obstacle
  noStroke();
  fill(255, 0, 0, 128);
  rect(
    obstacle.position.x,
    obstacle.position.y,
    obstacle.width,
    obstacle.height
  );

  // Update life span count
  lifeP.html(count);

  count++;
  if (count == lifeSpan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
}
