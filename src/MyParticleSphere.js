function MyParticleSphere(scene,radius) {
	CGFobject.call(this,scene);
	this.position;
	this.speed = null;
	var slices = 16;
	var stacks = 16;
	var radius = radius;
	this.sphere = new MySphere(scene,slices,stacks,radius);
};

MyParticleSphere.prototype = Object.create(CGFobject.prototype);
MyParticleSphere.prototype.constructor = MyParticleSphere;

MyParticleSphere.prototype.setSpeed = function(speed){
    this.speed = speed;
}

MyParticleSphere.prototype.setPosition = function(position){
    this.position = position;
}

MyParticleSphere.prototype.getPosition = function(){
    return this.position;
}

MyParticleSphere.prototype.getSpeed = function(){
    return this.speed;
}

MyParticleSphere.prototype.updatePosition = function(timeInSeconds){
	 this.position = [this.position[0] + this.speed[0] * timeInSeconds,
                      this.position[1] + this.speed[1] * timeInSeconds,
                      this.position[2] + this.speed[2] * timeInSeconds];
}

MyParticleSphere.prototype.display = function(){
	this.scene.pushMatrix();
		this.scene.translate(this.position[0],this.position[1],this.position[2]);
		this.sphere.display();
	this.scene.popMatrix();
}


