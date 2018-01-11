/**
 * MyPrism
 * @constructor
 */
function MyDoubleSideCylinder(scene, slices, stacks, radius) {
    CGFobject.call(this, scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius || 1;
    this.initBuffers();
};

MyDoubleSideCylinder.prototype = Object.create(CGFobject.prototype);
MyDoubleSideCylinder.prototype.constructor = MyDoubleSideCylinder;

MyDoubleSideCylinder.prototype.initBuffers = function() {
    /*
     * TODO:
     * Replace the following lines in order to build a Cylinder with a **single mesh**.
     *
     * How can the vertices, indices and normals arrays be defined to
     * build a prism with varying number of slices and stacks?
     */

    var angle = (2 * Math.PI) / this.slices;

    
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    //Exterior
    for (stack = 0; stack <= this.stacks; stack++) {
        for (i = 0; i <= this.slices; i++) {
            //Add Vertices
            this.vertices.push(Math.cos(i * angle)*this.radius, Math.sin(i * angle)*this.radius, stack / this.stacks);

            //Add Normals
            this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 0);

            //Add textCoords
            this.texCoords.push(i / this.slices, stack / this.stacks);

        }
    }
    for (stack = 0; stack < this.stacks; stack++) {
        stack_const = this.slices + 1;
        for (i = 0; i < this.slices; i++) {
            this.indices.push(i + (stack * stack_const), (i + 1) + (stack * stack_const), i + this.slices + 1 + (stack * stack_const));
            this.indices.push(i + 1 + (stack * stack_const), (i + this.slices + 2) + (stack * stack_const), i + this.slices + 1 + (stack * stack_const));
        }
    }

    var previousNumberOfVertices = (this.stacks +1)*(this.slices+1);
    //Interior
    for (stack = 0; stack <= this.stacks; stack++) {
        for (i = 0; i <= this.slices; i++) {
            //Add Vertices
            this.vertices.push(Math.cos(i * angle)*this.radius, Math.sin(i * angle)*this.radius, stack / this.stacks);

            //Add Normals
            this.normals.push(-Math.cos(i * angle),-Math.sin(i * angle), 0);

            //Add textCoords
            this.texCoords.push(i / this.slices, stack / this.stacks);

        }
    }
    
    for (stack = 0; stack < this.stacks; stack++) {
        stack_const = this.slices + 1;
        for (i = 0; i < this.slices; i++) {
            this.indices.push(i + this.slices + 1 + (stack * stack_const), (i + 1) + (stack * stack_const),i + (stack * stack_const));
            this.indices.push(i + this.slices + 1 + (stack * stack_const),(i + this.slices + 2) + (stack * stack_const),  i + 1 + (stack * stack_const));
        }
    }
    

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};