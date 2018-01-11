function MyTrapezeFace(scene, longBase, smallBase, height) {
    CGFobject.call(this, scene);
    this.longBase = longBase;
    this.smallBase = smallBase;
    this.height = height;
    this.initBuffers();
};

MyTrapezeFace.prototype = Object.create(CGFobject.prototype);
MyTrapezeFace.prototype.constructor = MyTrapezeFace;

MyTrapezeFace.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var rightExtreme = -this.longBase / 2.0;
    var leftExtreme = -rightExtreme;
    var firstMidPointZ = (this.longBase - this.smallBase) / 2.0 + rightExtreme;
    var secondMidPointZ = (this.longBase + this.smallBase) / 2.0 + rightExtreme;
    this.vertices.push(0,0,rightExtreme);
    this.vertices.push(0,this.height,firstMidPointZ);
    this.vertices.push(0,0,firstMidPointZ);
    this.vertices.push(0,this.height,secondMidPointZ);
    this.vertices.push(0,0,secondMidPointZ);
    this.vertices.push(0,0,leftExtreme);
    this.indices.push(0,1,2,2,1,3,2,3,4,4,3,5);
    for (i = 0; i < 6; i++){
        this.normals.push(1,0,0);
    }
    this.texCoords.push(1,1);
    var helpVariable = this.smallBase/(2*this.longBase);
    this.texCoords.push(0.5 + helpVariable,0);
    this.texCoords.push(0.5 + helpVariable,1);
    this.texCoords.push(0.5 - helpVariable,0);
    this.texCoords.push(0.5 - helpVariable,1);
    this.texCoords.push(0,1);
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}