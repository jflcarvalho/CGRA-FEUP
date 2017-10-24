/**
 * MyClock
 * @constructor
 */
function MyClock(scene) {
    CGFobject.call(this, scene);
    this.handS = new MyClockHand(scene);
    this.handM = new MyClockHand(scene);
    this.handH = new MyClockHand(scene);
    this.clock = new MyCylinderWithTops(scene, 12, 4);
    this.initBuffer();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(deltaTime) {
    this.rotationS = this.handS.angle + deltaTime * 0.006;
    if (this.rotationS > 360) {
        this.rotationS = this.rotationS % 360;
    }
    this.handS.setAngle(this.rotationS);
    this.rotationM = this.handM.angle + deltaTime * 0.0001;
    if (this.rotationM > 360) {
        this.rotationM = this.rotationM % 360;
    }
    this.handM.setAngle(this.rotationM);
    this.rotationH = this.handH.angle + deltaTime * (0.03 / 3600);
    if (this.rotationH > 360) {
        this.rotationH = this.rotationH % 360;
    }
    this.handH.setAngle(this.rotationH);
};

MyClock.prototype.initBuffer = function() {
    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.setAmbient(0.5, 0.5, 0.5, 0.7);
    this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 0.7);
    this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 0.8);
    this.clockAppearance.setShininess(50);
    this.clockAppearance.loadTexture("../resources/images/clock.png");
    this.handS.setAngle(90);
    this.handM.setAngle(180);
    this.handH.setAngle(270);
};

MyClock.prototype.display = function() {
    //TODO: display cylinder here
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.2);
    this.clock.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.2);
    //Seconds Hand
    this.scene.pushMatrix();
    //this.scene.scale(0.01, 0.01, 0.9);
    this.handS.display();
    this.scene.popMatrix();
    //Minutes Hand
    this.scene.pushMatrix();
    //this.scene.scale(0.01, 0.01, 0.7);
    //this.handM.display();
    this.scene.popMatrix();
    //Hours Hand
    this.scene.pushMatrix();
    //this.scene.scale(0.01, 0.01, 0.5);
    //this.handH.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
};