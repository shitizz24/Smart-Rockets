function Rocket(dna) {
  this.pos = createVector(width / 2, height - 10);
  this.vel = createVector();
  this.acc = createVector();

  this.color = color(random(50, 250), random(50, 250), random(50, 250));
  this.completed = false;
  this.crashed = false;
  this.counted = false;
  this.obstaclecrashed = false;
  this.history = [];
  this.strokecolor = color(random(50, 250), random(50, 250), random(50, 250));
  this.dna = dna ? dna : new DNA();
  this.fitness = 0;

  this.applyForce = function (force) {
    this.acc.add(force);
  };
  this.calcFitness = function () {
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed) {
      this.fitness *= 10 * (1000 / count);
    }
    if (this.crashed) {
      this.fitness /= 20;
    }
    if (this.obstaclecrashed) {
      this.fitness /= 40;
    }
  };

  this.collision = function () {
    for (var i = 0; i < obstacles.length; i++) {
      if (
        this.pos.x >= obstacles[i].corner1.x &&
        this.pos.x <= obstacles[i].corner2.x &&
        this.pos.y >= obstacles[i].corner1.y &&
        this.pos.y <= obstacles[i].corner2.y
      ) {
        this.obstaclecrashed = true;
        break;
      }
    }
  };

  this.update = function () {
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

    if (d < 30) {
      this.completed = true;
      this.pos = target.pos.copy();

      if (!this.counted) {
        numberofhits++;
        this.counted = true;
      }
    }

    this.history.push(createVector(this.pos.x, this.pos.y));
    if (this.history.length > 30) {
      this.history.splice(0, 1);
    }
    this.applyForce(this.dna.genes[count]);
    this.collision();

    if (!this.completed && !this.crashed && !this.obstaclecrashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  };

  this.show = function () {
    push();

    stroke(0);
    fill(this.color);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);

    rect(0, 0, 25, 5);

    pop();
    noFill();
    stroke(this.strokecolor);
    strokeWeight(1);
    beginShape();

    for (var i = 0; i < this.history.length; i++) {
      vertex(this.history[i].x, this.history[i].y);

      endShape();
    }
  };
}
