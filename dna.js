function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function (partner) {
    var newgen = [];

    var idx = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > idx) {
        newgen[i] = partner.genes[i];
      } else {
        newgen[i] = this.genes[i];
      }
    }
    return new DNA(newgen);
  };

  this.mutation = function () {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(i) > mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  };
}
