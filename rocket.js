/*
 * Sahithyen Kanganayagam (mail@sahithyen.com)
 * Original author: Daniel Shiffman
 * Forked from https://github.com/RainbowCoder/Video-Lesson-Materials
 */

function Rocket(dna) {
  this.position = start.position.copy();
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.finishingTime = 0;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = this.position.dist(target.position);
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed) {
      this.fitness *= 10;
      this.fitness += (lifeSpan - this.finishingTime) * 1000;
    }

    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  this.update = function() {
    // Check whether the rocket has reached the target
    var d = this.position.dist(target.position);
    if (d < target.width / 2) {
      this.completed = true;
      this.finishingTime = count;
    }

    // Check collision with obstacle
    this.crashed = this.position.x > obstacle.position.x &&
      this.position.x < obstacle.position.x + obstacle.width &&
      this.position.y > obstacle.position.y &&
      this.position.y < obstacle.position.y + obstacle.height;

    // Check collision with canvas sides
    this.crashed = this.crashed ||
      this.position.x > width ||
      this.position.x < 0 ||
      this.position.y > height ||
      this.position.y < 0;

    // Update vectors
    if (!(this.completed || this.crashed)) {
      this.acc.add(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.position.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(8);
    }
  }

  this.show = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.vel.heading());
    imageMode(CENTER);
    if (this.completed) {
      image(images.GARocketFinished, 0, 0, 25, 5);
    } else if (this.crashed) {
      image(images.GARocketDestroyed, 0, 0, 25, 5);
    } else {
      image(images.GARocket, 0, 0, 25, 5);
    }
    pop();
  }
}
