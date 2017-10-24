/**
 * MyClockHand
 * @constructor
 */
//MyClockHand e uma subclasse de CGFobject
function MyClockHand(scene, width, height) {
	CGFobject.call(this,scene);
	this.width = width;
	this.height = height;
	this.initBuffers();
};


MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	this.vertices = [
            -0.01, 0, 0,
             0.01, 0, 0,
                0, 1, 0	];

	this.indices = [
            0, 1, 2, 
        ];

    this.normals = [ 0, 0, 1,
                     0, 0, 1,
                     0, 0, 1 ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function (ang) {
	//console.log("Parameter Angle:" + angle);
	
	this.angle = ang * Math.PI/180.0;
	//console.log("New Angle:" + this.angle);
};

MyClockHand.prototype.display = function() {

    this.scene.pushMatrix();
	this.scene.rotate(-this.angle, 0, 0, 1);
	this.scene.scale(this.width, this.height, 1);
    CGFobject.prototype.display.call(this);
    this.scene.popMatrix();
};