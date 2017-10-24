/**
 * MyPrism
 * @constructor
 */
function MyLamp(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {
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
        h = stack / this.stacks;
        radius = Math.sqrt(1 - (h * h));
        //console.log(radius);
        for (i = 0; i <= this.slices; i++) {
            //Vertice 0
            this.vertices.push(Math.cos(i * angle) * radius, Math.sin(i * angle) * radius, h);

            //Add Normals
            this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 0);

            //Add textCoords
            this.texCoords.push(i / this.slices, stack / this.stacks);

        }
    }
    for (stack = 0; stack < this.stacks; stack++) {
        stack_const = this.slices + 1;
        for (i = 0; i < this.slices; i++) {
            this.indices.push(i + (stack * stack_const), (i + 1) + (stack * stack_const), i + 1 + this.slices + (stack * stack_const));
            this.indices.push(i + 1 + (stack * stack_const), (i + this.slices + 2) + (stack * stack_const), i + this.slices + 1 + (stack * stack_const));
        }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};