function MyParallelepiped3D(scene, width, height,thickness) {
	CGFobject.call(this,scene);
	this.width = width;
	this.height = height;
	this.thickness = thickness;
	this.zFace = new MyQuad(scene,0,1,0,1,width,this.height);
	this.yFace = new MyQuad(scene,0,1,0,1,width,thickness);
	this.xFace = new MyQuad(scene,0,1,0,1,thickness,height);
};

MyParallelepiped3D.prototype = Object.create(CGFobject.prototype);
MyParallelepiped3D.prototype.constructor=MyParallelepiped3D;

MyParallelepiped3D.prototype.display = function() {

    this.displayFrontSide();
    this.displayBackSide();
    this.displayTopSide();
    this.displayBottomSide();
    this.displayRightSide();
    this.displayLeftSide();
    
}

MyParallelepiped3D.prototype.displayFrontSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(0,0,this.thickness/2.0);
        this.zFace.display();
    this.scene.popMatrix();
}

MyParallelepiped3D.prototype.displayBackSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(0,0,-this.thickness/2.0);
        this.scene.rotate(Math.PI,0,1,0);
        this.zFace.display();
    this.scene.popMatrix();
}


MyParallelepiped3D.prototype.displayTopSide = function(){
     this.scene.pushMatrix();
        this.scene.translate(0,this.height/2.0,0);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.yFace.display();
    this.scene.popMatrix();
}

MyParallelepiped3D.prototype.displayBottomSide = function(){
     this.scene.pushMatrix();
        this.scene.translate(0,-this.height/2.0,0);
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.yFace.display();
    this.scene.popMatrix();
}


MyParallelepiped3D.prototype.displayRightSide = function(){
    this.scene.pushMatrix();
    	this.scene.translate(this.width/2.0,0,0);
    	this.scene.rotate(Math.PI/2.0,0,1,0);
        this.xFace.display();
    this.scene.popMatrix();
}

MyParallelepiped3D.prototype.displayLeftSide = function(){
    this.scene.pushMatrix();
    	this.scene.translate(-this.width/2.0,0,0);
    	this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.xFace.display();
    this.scene.popMatrix();
}