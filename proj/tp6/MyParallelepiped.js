/**
 * MyParallelepiped
 * @constructor
 */
//MyParallelepiped e uma subclasse de CGFobject

function MyParallelepiped(scene, width, height,thickness) {
	CGFobject.call(this,scene);
	this.width = width;
	this.height = height;
	this.thickness = thickness;
	this.initBuffers();
};


MyParallelepiped.prototype = Object.create(CGFobject.prototype);
MyParallelepiped.prototype.constructor=MyParallelepiped;

MyParallelepiped.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	var half_width = this.width /2.0;
	var half_height = this.height /2.0;
	var half_thickness = this.thickness/2.0;
	for (i = 0; i < 3;i++){
		//Front Side
		this.vertices.push(half_width,half_height,half_thickness);
		this.vertices.push(-half_width,half_height,half_thickness);
		this.vertices.push(-half_width,-half_height,half_thickness);
		this.vertices.push(half_width,-half_height,half_thickness);
		//Back Side
		this.vertices.push(half_width,half_height,-half_thickness);
		this.vertices.push(-half_width,half_height,-half_thickness);
		this.vertices.push(-half_width,-half_height,-half_thickness);
		this.vertices.push(half_width,-half_height,-half_thickness);

	}
	//Add Indices for Front and Back
	this.indices.push(0,1,2,0,2,3);
	this.indices.push(7,6,4,4,6,5);
	//Add Indices for Sides
	this.indices.push(11,15,8,15,12,8);
	this.indices.push(9,14,10,9,13,14);
	//Add Indices for Front Top and Bottom
	this.indices.push(16,20,17,17,20,21);
	this.indices.push(18,23,19,18,22,23);
	
	//Add Normals for Front
	for (i = 0; i < 4; i++){
		this.normals.push(0,0,1);
	}
	//Add Normals for Back
	for (i = 0; i < 4; i++){
		this.normals.push(0,0,-1);
	}
	//Add Normals for Right Side
	for (i = 0; i < 4; i++){
		this.normals.push(1,0,0);
	}
	//Add Normals for Left Side
	for (i = 0; i < 4; i++){
		this.normals.push(-1,0,0);
	}
	//Add Normals for Top
	for (i = 0; i < 4; i++){
		this.normals.push(0,1,0);
	}
	//Add Normals for Bottom
	for (i = 0; i < 4; i++){
		this.normals.push(0,-1,0);
	}

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
