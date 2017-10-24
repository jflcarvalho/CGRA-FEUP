/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	
	this.quad = new MyQuad(this.scene);
	//this.quad.initBuffers();
};



MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;


MyUnitCubeQuad.prototype.display = function(){
	this.deg2rad=Math.PI/180.0;
	//Front Face
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
	//Back Face
	this.scene.pushMatrix();
		this.scene.rotate(180.0*this.deg2rad,1,0,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
	//Right Face
	this.scene.pushMatrix();
		this.scene.rotate(90.0*this.deg2rad,0,1,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
	//Left Face
	this.scene.pushMatrix();
		this.scene.rotate(-90*this.deg2rad,0,1,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
	//Top Face
	this.scene.pushMatrix();
		this.scene.rotate(-90*this.deg2rad,1,0,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
	//Bottom Face
	this.scene.pushMatrix();
		this.scene.rotate(90*this.deg2rad,1,0,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix();
};
