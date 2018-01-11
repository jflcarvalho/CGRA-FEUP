function MyBubbles(scene, numParticles, lifeSpan, bubblesMinRadius, bubblesMaxRadius) {
    CGFobject.call(this, scene);
    this.maxSpeed = 3;
    this.particlesPool = null;
    this.particlesLeftTime = [];
    this.spawn;
    this.numParticles = numParticles;
    this.lifeSpan = lifeSpan; //in miliseconds
    this.bubblesMaxRadius = bubblesMaxRadius;
    this.bubblesMinRadius = bubblesMinRadius;
    this.totalTime = 0;
    this.particlesVelocity;
};

MyBubbles.prototype = Object.create(CGFobject.prototype);
MyBubbles.prototype.constructor = MyBubbles;

MyBubbles.prototype.setVelocity = function(velocity){
    this.particlesVelocity = velocity;
}

MyBubbles.prototype.setSpawn = function(position){
    this.spawn = position;
}

MyBubbles.prototype.createParticles = function() {
    for (var h = 0; h < this.numParticles; h++) {
        var radius = Math.random() * this.bubblesMaxRadius + this.bubblesMinRadius;
        var bubble = new MyParticleSphere(this.scene, radius);
        var randValue = Math.random()/8;
        var particle = new MyParticleSphere(this.scene,radius);
        this.particlesPool.push(particle);
        this.particlesLeftTime.push(0);
    }
}

MyBubbles.prototype.getNextAvailableIndex = function(){
    if (this.particlesPool== null){
        this.particlesPool = [];
        this.createParticles();
    }
    for (var l = 0; l < this.numParticles;l++){
        if (this.particlesLeftTime[l] <= 0){
            return l;
        }
    }
}

MyBubbles.prototype.update = function(deltaTime){
    var currentParticle;
    var timeInSeconds = deltaTime/1000;
    var index = this.getNextAvailableIndex();
    currentParticle = this.particlesPool[index];
    if (currentParticle != null){
        var randValue = Math.random()/4;
        var particleSpeed = [this.particlesVelocity[0] + randValue,this.particlesVelocity[1]+randValue,this.particlesVelocity[2]+randValue];
        currentParticle.setSpeed(particleSpeed);
        currentParticle.setPosition(this.spawn);
        this.particlesLeftTime[index] = this.lifeSpan;
    }
    
    for (var j = 0; j  < this.numParticles; j++){
        if (this.particlesLeftTime[j] > 0){
            currentParticle = this.particlesPool[j];
            currentParticle.updatePosition(timeInSeconds);
            this.particlesLeftTime[j] -= deltaTime;
        }
    }
}

MyBubbles.prototype.display = function(deltaTime){
    for (var i= 0; i < this.numParticles;i++){
        if(this.particlesLeftTime[i] > 0){
            var currentParticle = this.particlesPool[i];
            this.scene.pushMatrix();
                currentParticle.display();
            this.scene.popMatrix();
        }
    }
}
