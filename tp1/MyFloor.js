/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
};

MyFloor.prototype.display = function(){

    this.scene.pushMatrix();
        this.scene.scale(8, 0.1 ,5);
        this.scene.translate(0, 0.1,0);
        this.cube.display();
    this.scene.popMatrix();

}