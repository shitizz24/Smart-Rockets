function Population() {
  this.rockets = [];

  this.popsize = 30;

  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.reset = function () {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }
  };

  this.evaluate = function () {
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  };

  this.selection = function () {
    var newRockets = [];

    for (var i = 0; i < this.rockets.length; i++) {
      var parent1 = random(this.matingpool).dna;
      var parent2 = random(this.matingpool).dna;

      var child = parent1.crossover(parent2);

      child.mutation();

      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  };

  this.run = function () {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  };
}
