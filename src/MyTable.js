function MyTable(scene) {
	CGFobject.call(this,scene);
	
	this.cube = new MyUnitCubeQuad(this.scene);
};



MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function(){
	this.displayLeg(-2.3,0,-1.3);
	this.displayLeg(2.3,0,-1.3);
	this.displayLeg(-2.3,0,1.3);
	this.displayLeg(2.3,0,1.3);
	this.displaySurface();
}

MyTable.prototype.displayLeg = function(x,y,z){
	this.scene.pushMatrix();
		this.scene.legMaterial.apply();
		this.scene.scale(0.3,3.5,0.3);
		this.scene.translate(x/0.3,(1.75+y)/3.5,z/0.3);
		this.cube.display();
	this.scene.popMatrix();
}

MyTable.prototype.displaySurface = function(){
	this.scene.pushMatrix();
		this.scene.tableAppearance.apply();
		this.scene.scale(5,0.3,3);
		this.scene.translate(0,(0.15+3.5)/0.3,0);
		this.cube.display();
	this.scene.popMatrix();
}
