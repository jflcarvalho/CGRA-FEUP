function MyExplosion(scene, numParticles, lifeSpan, particlesMinSize, particlesMaxSize) {
    CGFobject.call(this, scene);
    this.maxSpeed = 3;
    this.particles = [];
    this.position;
    this.numParticles = numParticles;
    this.lifeSpan = lifeSpan;
    this.particlesMaxSize = particlesMaxSize;
    this.particlesMinSize = particlesMinSize;
    this.totalTime = 0;
    this.done = false;
};


MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.createParticles = function() {
    var auxSpeed = 2 * this.maxSpeed - this.maxSpeed;
    for (i = 0; i < this.numParticles; i++) {
        var width = Math.random() * this.particlesMaxSize + this.particlesMinSize;
        var height = Math.random() * this.particlesMaxSize + this.particlesMinSize;
        var thickness = Math.random() * this.particlesMaxSize + this.particlesMinSize;
        var particle = new MyParticle(this.scene, width, height, thickness);
        var speed = [Math.random() * 2 * this.maxSpeed - this.maxSpeed, Math.random() * 2 * this.maxSpeed - this.maxSpeed, Math.random() * 2 * this.maxSpeed - this.maxSpeed]
        particle.setSpeed(speed);
        this.particles.push(particle);
    }
}

MyExplosion.prototype.setLocation = function(position) {
    this.position = position;
    var particle;
    for (i = 0; i < this.numParticles; i++) {
        particle = this.particles[i];
        particle.setPosition(position);
    }
}

MyExplosion.prototype.updatePositions = function(deltaTime) {
    if (this.totalTime < this.lifeSpan) {
        this.totalTime += deltaTime;
        for (i = 0; i < this.numParticles; i++) {
            var currentParticle = this.particles[i];
            var speed = currentParticle.getSpeed();
            var previousPosition = currentParticle.getPosition();
            var timeSeconds = deltaTime / 1000;
            this.deltaAngle = Math.PI / 500 * deltaTime;
            currentParticle.increaseAngle(this.deltaAngle);
            var nextPositionX = previousPosition[0] + speed[0] * timeSeconds;
            var nextPositionY = previousPosition[1] + speed[1] * timeSeconds;
            var nextPositionZ = previousPosition[2] + speed[2] * timeSeconds;
            var nextPosition = [nextPositionX, nextPositionY, nextPositionZ];
            currentParticle.setPosition(nextPosition);
        }

    } else {
        this.done = true;
    }


}

MyExplosion.prototype.display = function() {
    var currentParticle;
    if (this.totalTime < this.lifeSpan) {
        for (i = 0; i < this.numParticles; i++) {
            currentParticle = this.particles[i];
            currentParticle.display();
        }
    }
}