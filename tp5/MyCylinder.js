/**
 * MyPrism
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyPrism;

MyCylinder.prototype.initBuffers = function() {
    /*
     * TODO:
     * Replace the following lines in order to build a Cylinder with a **single mesh**.
     *
     * How can the vertices, indices and normals arrays be defined to
     * build a prism with varying number of slices and stacks?
     */

    var angle = (2 * Math.PI) / this.slices;

    //console.log("Angle: " + angle);

    //console.log("Number Of Slices " + this.slices);
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (stack = 0; stack <= this.stacks; stack++) {
        for (i = 0; i <= this.slices; i++) {
            //Vertice 0
            this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), stack / this.stacks);

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


    //console.log("Vertices Size:" + this.vertices.length);
    //console.log(this.vertices);
    //console.log("Indices Size:" + this.indices.length);
    //console.log("Normals Size:" + this.normals.length);
    //console.log("Indices:");
    //console.log(this.indices);
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};