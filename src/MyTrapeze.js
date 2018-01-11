/**
 * MyTrapeze
 * @constructor
 */
function MyTrapeze(scene, longBase, smallBase, height, thickness) {
    CGFobject.call(this, scene);
    this.longBase = longBase;
    this.smallBase = smallBase;
    this.height = height;
    this.thickness = thickness;
    this.angle = 0;
    this.initBuffers();
};

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    var rightExtreme = -this.longBase / 2.0;
    var leftExtreme = -rightExtreme;
    var halfThickness = this.thickness / 2.0;
    var firstMidPointZ = (this.longBase - this.smallBase) / 2.0 + rightExtreme;
    var secondMidPointZ = (this.longBase + this.smallBase) / 2.0 + rightExtreme;
    var firstAngle = Math.atan(this.height / firstMidPointZ);

    for (i = 0; i < 4; i++) {
        if (i > 0) {
            halfThickness = -halfThickness;
        }
        //Vertice 0
        this.vertices.push(halfThickness, 0, rightExtreme);
        //Vertice 1
        this.vertices.push(halfThickness, this.height, firstMidPointZ);
        //Vertice 2
        this.vertices.push(halfThickness, 0, firstMidPointZ);
        //Vertice 3
        this.vertices.push(halfThickness, this.height, secondMidPointZ);
        //Vertice 4
        this.vertices.push(halfThickness, 0, secondMidPointZ);
        //Vertice 5
        this.vertices.push(halfThickness, 0, leftExtreme);
    }
    //Front Side
    this.indices.push(0, 1, 2, 2, 1, 4, 4, 1, 3, 4, 3, 5);
    //Back Side
    this.indices.push(8, 7, 6, 10, 7, 8, 9, 7, 10, 11, 9, 10);
    //Side Normals
    for (i = 1; i > -2; i = i - 2) {
        this.normals.push(i, 0, 0);
        this.normals.push(i, 0, 0);
        this.normals.push(i, 0, 0);
        this.normals.push(i, 0, 0);
        this.normals.push(i, 0, 0);
        this.normals.push(i, 0, 0);
    }
    //Top Side
    this.indices.push(13, 19, 15, 15, 19, 21);
    //Bottom Side
    this.indices.push(14, 18, 12, 20, 18, 14, 16, 20, 14, 22, 20, 16, 17, 22, 16, 23, 22, 17);
    for (i = 0; i < 4; i++) {
        this.normals.push(0, 1, 0);
    }
    for (i = 0; i < 8; i++) {
        this.normals.push(0, -1, 0);
    }
    //Create Inclined Sides
    for (i = 0; i < 2; i++) {
        halfThickness = -halfThickness;
        //Vertice 24
        this.vertices.push(halfThickness, 0, rightExtreme);
        //Vertice 25
        this.vertices.push(halfThickness, this.height, firstMidPointZ);
        //Vertice 26
        this.vertices.push(halfThickness, this.height, secondMidPointZ);
        //Vertice 27
        this.vertices.push(halfThickness, 0, leftExtreme);
    }
    this.indices.push(24, 28, 25, 25, 28, 29, 26, 30, 27, 27, 30, 31);
    for (i = 0; i < 8; i++) {
        if (i < 4) {
            this.normals.push(0, Math.cos(firstAngle), -Math.sin(firstAngle));
        } else {
            this.normals.push(0, Math.cos(firstAngle), Math.sin(firstAngle));
        }
    }



    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}