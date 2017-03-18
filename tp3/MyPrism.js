/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	pi = Math.PI;
	step = (pi*2)/(this.slices);
	for (i = 0; i < this.slices; i++){ //slides
		this.vertices.push(Math.cos(i*step),Math.sin(i*step),0);
		this.vertices.push(Math.cos(i*step + step),Math.sin(i*step +step),0);
		this.vertices.push(Math.cos(i*step),Math.sin(i*step),1);
		this.vertices.push(Math.cos(i*step + step),Math.sin(i*step + step),1);
		this.indices.push(4*i, 4*i+1, 4*i+2, 4*i+3, 4*i+2, 4*i+1);
		for(j = 0; j < 4; j++){
			this.normals.push(Math.cos(i*step + step/2),Math.sin(i*step + step/2),0)
		}
	}

	console.log(this.vertices);
	console.log(this.indices);
	console.log(this.normals);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
