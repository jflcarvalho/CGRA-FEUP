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

	var angle = (2*Math.PI)/this.slices;

	console.log("Angle: " + angle);

	console.log("Number Of Slices " + this.slices);
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	
	
	for (stack = 0; stack < this.stacks; stack++){
		for (i = 0; i < this.slices; i++) {
			this.normal_angle = i*angle + (angle/2.0);
			this.stack_constant = stack*4*this.slices;
			//Vertice 0 
			this.vertices.push(Math.cos(i*angle),Math.sin(i*angle),stack/this.stacks);

			//Vertice 1
			this.vertices.push(Math.cos(i*angle),Math.sin(i*angle),(stack+1)/this.stacks);

			//Vertice 2
			this.vertices.push(Math.cos((i+1)*angle),Math.sin((i+1)*angle),stack/this.stacks);

			//Vertice 3
			this.vertices.push(Math.cos((i+1)*angle),Math.sin((i+1)*angle),(stack+1)/this.stacks);

			//Create first triangle
			this.indices.push(i*4+this.stack_constant,(4*i)+2+this.stack_constant,(4*i)+1+this.stack_constant);

			//Create second triangle
			this.indices.push((4*i)+2+this.stack_constant,(4*i)+3+this.stack_constant,(4*i)+1+this.stack_constant);

			//Add normals
			for (k = 0; k < 4; k++){
				this.normals.push(Math.cos(this.normal_angle),Math.sin(this.normal_angle),0);
			} 	

		}

 	}
 	//Add Bases
		//this.vertices.push(0,0,0); // Center 1
		//this.vertices.push(0,0,1); //Center2
		
		base_const = this.slices * this.stacks * 2;
		center1 = base_const * 2;
		center2 = center1+1;
		console.log("Center1 "+center1);
		console.log("Center2 "+center2);
		console.log("Base Const " + base_const);
		//this.indices.push(0,12,2);
		//this.indices.push(4,12,6);
		//this.indices.push(8,12,10);

		/*
		for (i = 0; i < this.slices; i++){
			//Add back base triangle
			this.indices.push(4*i,center1,4*i+2);
			console.log("push("+4*i+","+center1+","+(4*i+2)+");");
			//Add front base triangle
			//this.indices.push(4*i+base_const+1,4*i+base_const+3, center2);
		}*/
	
	console.log("Vertices Size:" + this.vertices.length);
	console.log("Indices Size:" + this.indices.length);
	console.log("Normals Size:" + this.normals.length);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
