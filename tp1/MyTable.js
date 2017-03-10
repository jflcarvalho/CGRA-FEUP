/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype.display = function(){
    this.displayLeg(-2, 0, -1);
    this.displayLeg(2, 0, -1);
    this.displayLeg(-2, 0, 1);
    this.displayLeg(2, 0, 1);

    this.scene.pushMatrix();
        this.scene.scale(5, 0.3 ,3);
        this.scene.translate(0, 3.5 / 0.3 + 0.3,0);
        this.cube.display();
    this.scene.popMatrix();

}

MyTable.prototype.displayLeg = function(x, y, z){
    this.scene.pushMatrix();
        this.scene.scale(0.3, 3.5, 0.3);
        this.scene.translate(x / 0.3, y / 3.5 + 0.5, z / 0.3);
        this.cube.display();
    this.scene.popMatrix();
}