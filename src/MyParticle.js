function MyParticle(scene,width,height,thickness) {
	CGFobject.call(this,scene);
	this.position;
	this.speed;
	this.angle = 0;
	this.parallelepiped = new MyParallelepiped3D(scene,width,height,thickness)
};

MyParticle.prototype = Object.create(CGFobject.prototype);
MyParticle.prototype.constructor = MyParticle;

MyParticle.prototype.setSpeed = function(speed){
    this.speed = speed;
}

MyParticle.prototype.setPosition = function(position){
    this.position = position;
}

MyParticle.prototype.getPosition = function(){
    return this.position;
}

MyParticle.prototype.getSpeed = function(){
    return this.speed;
}

MyParticle.prototype.increaseAngle = function(deltaAngle){
	this.angle += deltaAngle;
}
MyParticle.prototype.display = function(){
	this.scene.pushMatrix();
		this.scene.translate(this.position[0],this.position[1],this.position[2]);
		this.scene.rotate(this.angle,1,0,1);
		this.parallelepiped.display();
	this.scene.popMatrix();
}