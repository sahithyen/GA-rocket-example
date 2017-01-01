/*
 * Sahithyen Kanganayagam (mail@sahithyen.com)
 * Original author: Daniel Shiffman
 * Forked from https://github.com/RainbowCoder/Video-Lesson-Materials
 */


var
  population,
  lifespan = 400,
  lifeP,
  count = 0,
  maxforce = 0.2,
  target,
  obstacle;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP();

  target = {
    position: createVector(
      width * 0.95,
      height / 2
    ),
    width: 16,
    height: 16
  };
  obstacle = {
    position: createVector(
      width / 2 - 10,
      height / 2 - 100
    ),
    width: 20,
    height: 200
  };
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
  }

  // Draw obstacle
  noStroke();
  fill(255);
  rect(
    obstacle.position.x,
    obstacle.position.y,
    obstacle.width,
    obstacle.height
  );

  // Draw target
  ellipseMode(CENTER);
  ellipse(target.position.x, target.position.y, target.width, target.height);
}
