/**
 * MyStaticSubmarine
 * @constructor
 */
function MyStaticSubmarine(scene, position) {
    CGFobject.call(this, scene);
    this.angle = 0;
    this.inclination = 0;
    this.xPosition = position[0];
    this.yPosition = position[1];
    this.zPosition = position[2];
    this.mainBodyMid = new MyCylinder(scene, 16, 8, 0.5);
    this.mainBodyFront = new MySemiSphere(scene, 16, 16, 0.5);
    this.mainBodyBack = new MySemiSphere(scene, 16, 16, 0.5);
    this.tower = new MyCylinderWithTops(scene, 16, 8, 0.5);
    this.periscopeVertical = new MyCylinder(scene, 16, 8);
    this.periscopeHorizontal = new MyCylinderWithTops(scene, 16, 8);
    this.towerWing = new MyTrapeze3D(scene, 1.42, 1, 0.3, 0.05);
    this.backHorizontalWing = new MyTrapeze3D(scene, 1.7, 1.42, 0.3, 0.1);
    this.backVerticalWing = new MyTrapeze3D(scene, 2.34, 1.64, 0.3, 0.1);
    this.rightHelice = new MyHelice(scene, 0.2, 0.2);
    this.leftHelice = new MyHelice(scene, 0.2, 0.2);

    this.periscopeHeight = 0.07;
};

MyStaticSubmarine.prototype = Object.create(CGFobject.prototype);
MyStaticSubmarine.prototype.constructor = MyStaticSubmarine;

MyStaticSubmarine.prototype.setAngle = function(angle){
    this.angle = angle;
}

MyStaticSubmarine.prototype.setInclination = function(angle){
    this.inclination = angle;
}

MyStaticSubmarine.prototype.display = function() {
    //Display Submarine
    this.scene.pushMatrix();
    this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
    this.scene.translate(0, 0, 3.2);
    this.scene.rotate(this.angle, 0, 1, 0);
    this.scene.rotate(-this.inclination, 1, 0, 0);
    this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.translate(0, 0, -3.2);
    this.displayMainBody();
    this.displayPeriscope();
    this.displayHelices();
    this.displayWings();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.displayTorpedo();
    this.scene.popMatrix();
};

MyStaticSubmarine.prototype.displayTorpedo = function() {
    if (this.torpedo != null) {
        this.torpedo.display();
    }
}

MyStaticSubmarine.prototype.displayHelices = function() {
    this.scene.pushMatrix();
    this.scene.translate(0.53, -0.25, 0);
    this.rightHelice.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-0.53, -0.25, 0);
    this.leftHelice.display();
    this.scene.popMatrix();
}

MyStaticSubmarine.prototype.displayWings = function() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0.8, 2.7);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(this.inclination, 0, 0, 1);
    this.towerWing.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.3);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(this.inclination, 0, 0, 1);
    this.backHorizontalWing.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.translate(0, -0.3, 0);
    this.backVerticalWing.display();
    this.scene.popMatrix();
}


MyStaticSubmarine.prototype.displayPeriscope = function() {
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeHeight, 2.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.05, 0.05, 1.5);
    this.periscopeVertical.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeHeight + 1.5, 2.45);
    this.scene.scale(0.05, 0.05, 0.2);
    this.periscopeHorizontal.display();
    this.scene.popMatrix();

}

MyStaticSubmarine.prototype.displayMainBody = function() {
    this.scene.pushMatrix();
    this.scene.scale(0.73, 1, 1);
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 4.08);
    this.mainBodyMid.display(); //mid
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 4.08);
    this.scene.scale(1, 1, 0.92);
    this.mainBodyFront.display(); //front
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(1, 1, 0.92);
    this.mainBodyBack.display(); //back
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 1.07, 2.5);
    this.scene.scale(0.5, 1, 0.88);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.tower.display(); //tower
    this.scene.popMatrix();

    this.scene.popMatrix();
}