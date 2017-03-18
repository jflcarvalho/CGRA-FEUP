/**
 * MyPrism
 * @constructor
 */
 function MySphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {
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
	this.r = [];

	pi = Math.PI;
	step = (pi*2)/(this.slices);
	stepK = 1/(this.stacks);

	/* RAIO */
	for(k = 0; k <= this.stacks; k += stepK){
		this.r.push(Math.sqrt(2*(1-k)^2));
	}

	/* VERTICES */
	for(k = 0; k <= this.stacks; k += stepK){
		for (i = 0; i < this.slices; i++){ //slides
			this.vertices.push(Math.cos(i*step),Math.sin(i*step),k);
			this.normals.push(Math.cos(i*step),Math.sin(i*step),0);
		}
	}
	
	/* INDICES */
	for(k = 0; k < this.stacks; k++){
		for (i = 0; i < this.slices - 1; i++){ //slides
			this.indices.push(i + k*this.slices, i + k*this.slices+1, i + k*this.slices+this.slices,
							i + k*this.slices+this.slices+1, i + k*this.slices+this.slices, i + k*this.slices+1);
			if(i == this.slices - 2){
				this.indices.push(i + k*this.slices+1, 0, i + k*this.slices+this.slices + 1, k*this.slices+this.slices, i + k*this.slices+this.slices + 1, 0);
			}
		}
	}

	console.log(this.vertices);
	console.log(this.indices);
	console.log(this.normals);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
