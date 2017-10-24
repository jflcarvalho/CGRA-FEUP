function MyCircle(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyPrism;

MyCircle.prototype.initBuffers = function() {
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
    this.indices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5, 0);

    for (i = 0; i <= this.slices; i++) {
        //Vertice 0
        this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0);

        //Add Normals
        this.normals.push(0, 0, 1);

        //Add textCoords
        this.texCoords.push(0.5 * (Math.cos(i * angle) + 1), 0.5 * (Math.sin(i * angle) + 1));

    }
    stack_const = 1;
    for (i = 1; i < this.slices; i++) {
        this.indices.push(0, i, i + 1);
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