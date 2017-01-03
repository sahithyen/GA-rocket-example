/*
 * Sahithyen Kanganayagam (mail@sahithyen.com)
 * Original author: Daniel Shiffman
 * Forked from https://github.com/RainbowCoder/Video-Lesson-Materials
 */

function Population() {
  this.rockets = [];
  this.popsize = 25;

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }
  };

  this.selection = function() {
    var matingPool = [];

    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;

      for (var j = 0; j < n; j++) {
        matingPool.push(this.rockets[i]);
      }
    }

    var newRockets = [];
    for (i = 0; i < this.rockets.length; i++) {
      var parentA = random(matingPool).dna;
      var parentB = random(matingPool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  };

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  };
}
