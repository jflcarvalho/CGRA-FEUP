function MyTrapeze3D(scene, longBase, smallBase, height, thickness) {
    CGFobject.call(this, scene);

    this.longBase = longBase;
    this.smallBase = smallBase;
    this.height = height;
    this.thickness = thickness;
    this.frontFace = new MyTrapezeFace(this.scene,longBase,smallBase,height);
    this.backFace = new MyTrapezeFace(this.scene,longBase,smallBase,height);
    this.top = new MyQuad(this.scene);
    this.bottom = new MyQuad(this.scene);
    this.leftSide = new MyQuad(this.scene);
    this.rightSide = new MyQuad(this.scene);
    this.rightExtreme = -this.longBase / 2.0;
    this.firstMidPointZ = (this.longBase - this.smallBase) / 2.0 + this.rightExtreme;
    this.firstAngle = Math.PI/2.0 - Math.atan(this.height/-(this.rightExtreme-this.firstMidPointZ));
};

MyTrapeze3D.prototype = Object.create(CGFobject.prototype);
MyTrapeze3D.prototype.constructor = MyTrapeze3D;

MyTrapeze3D.prototype.display = function() {
    
    this.displayFrontSide();
    this.displayBackSide();
    this.displayTopSide();
    this.displayBottomSide();
    this.displayLeftSide();
    this.displayRightSide();
    
}


MyTrapeze3D.prototype.displayFrontSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(this.thickness/2.0,0,0);
        this.frontFace.display();
    this.scene.popMatrix();
}

MyTrapeze3D.prototype.displayBackSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(-this.thickness/2.0,0,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.backFace.display();
    this.scene.popMatrix();
}

MyTrapeze3D.prototype.displayTopSide = function(){
     this.scene.pushMatrix();
        this.scene.translate(0,this.height,0);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.scene.scale(this.thickness,this.smallBase,1);
        this.top.display();
    this.scene.popMatrix();
}

MyTrapeze3D.prototype.displayBottomSide = function(){
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.scene.scale(this.thickness,this.longBase,1);
        this.bottom.display();
    this.scene.popMatrix();
}

MyTrapeze3D.prototype.displayLeftSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(0,this.height/2,-(this.rightExtreme + this.firstMidPointZ)/2);
        this.scene.rotate(-this.firstAngle,1,0,0);
        this.scene.scale(this.thickness,this.height/Math.cos(this.firstAngle),1);
        this.leftSide.display();
    this.scene.popMatrix();
}

MyTrapeze3D.prototype.displayRightSide = function(){
    this.scene.pushMatrix();
        this.scene.translate(0,this.height/2,(this.rightExtreme + this.firstMidPointZ)/2);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(-this.firstAngle,1,0,0);
        this.scene.scale(this.thickness,this.height/Math.cos(this.firstAngle),1);
        this.rightSide.display();
    this.scene.popMatrix();
}