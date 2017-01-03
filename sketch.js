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
  maxForce = 1,
  mars,
  asteroids,
  earth;

function preload() {
  images.GARocket = loadImage("img/GARocket.png");
  images.GARocketFinished = loadImage("img/GARocketFinished.png");
  images.GARocketDestroyed = loadImage("img/GARocketDestroyed.png");
  images.GAEarth = loadImage("img/GAEarth.png");
  images.GAMars = loadImage("img/GAMars.png");
  images.GAVesta = loadImage("img/GAVesta.png");
}

function setup() {
  createCanvas(1500, 300);

  earth = {
    position: createVector(
      width * 0.1,
      height / 2
    ),
    width: 100,
    height: 100,
    image: images.GAEarth
  };
  mars = {
    position: createVector(
      width * 0.9,
      height / 2
    ),
    width: 50,
    height: 50,
    image: images.GAMars
  };
  asteroids = [{
    position: createVector(
      width / 2 - 100,
      height / 2 - 50
    ),
    width: 100,
    height: 100,
    image: images.GAVesta
  }, {
    position: createVector(
      width / 2 + 100,
      height / 2 + 50
    ),
    width: 100,
    height: 100,
    image: images.GAVesta
  }];

  population = new Population();
  lifeP = createP();
}

function draw() {
  background(0);

  imageMode(CENTER);

  // Draw earth
  image(
    earth.image,
    earth.position.x,
    earth.position.y,
    earth.width,
    earth.height
  );

  // Draw asteroids
  for (var i = 0; i < asteroids.length; i++) {
    var asteroid = asteroids[i];

    image(
      asteroid.image,
      asteroid.position.x,
      asteroid.position.y,
      asteroid.width,
      asteroid.height
    );
  }

  // Draw mars
  image(
    mars.image,
    mars.position.x,
    mars.position.y,
    mars.width,
    mars.height
  );

  // Update and draw population of rockets
  population.run();

  // Update life span count
  lifeP.html(count);

  count++;
  if (count == lifeSpan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
}
