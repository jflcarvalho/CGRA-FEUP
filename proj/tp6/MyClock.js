/**
 * MyClock
 * @constructor
 */
function MyClock(scene) {
    CGFobject.call(this, scene);
    this.handS = new MyClockHand(scene,2,0.4);
    this.handM = new MyClockHand(scene,3,0.3);
    this.handH = new MyClockHand(scene,3.5,0.2);
    this.clock = new MyCylinder(scene, 12, 4);
    this.circle = new MyCircle(scene,12);
    this.initBuffer();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(deltaTime) {
    //console.log("HandS Angle =" + this.handS.angle);
    this.newAngleS = this.handS.angle/Math.PI * 180.0 + deltaTime * 0.006;
    if (this.newAngleS > 360) {
        this.newAngleS = this.newAngleS % 360;
    }
    this.handS.setAngle(this.newAngleS);

    this.newAngleM = this.handM.angle/Math.PI * 180.0 + deltaTime * 0.0001;
    if (this.newAngleM > 360) {
        this.newAngleM = this.newAngleM % 360;
    }
    this.handM.setAngle(this.newAngleM);

    this.newAngleH = this.handH.angle/Math.PI * 180.0 + deltaTime * (0.03 / 3600);
    if (this.newAngleH > 360) {
        this.newAngleH = this.newAngleH % 360;
    }
    this.handH.setAngle(this.newAngleH);
};

MyClock.prototype.initBuffer = function() {
    
    this.handS.setAngle(90);
    this.handM.setAngle(180);
    this.handH.setAngle(270);
};

MyClock.prototype.display = function() {
    //Display Cylinder
    this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.2);
        this.clock.display();
    this.scene.popMatrix();
    //Display Circle
    this.scene.pushMatrix();
        this.scene.clockAppearance.apply();
        this.scene.translate(0,0,0.15);
        this.scene.scale(0.5,0.5,1);
        this.circle.display();
    this.scene.popMatrix();

    //Display Seconds
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.2);
        this.scene.handSAppearance.apply();
            this.handS.display();
        this.scene.popMatrix();

        //Display Minutes
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.205);
            this.scene.handMAppearance.apply();
            this.handM.display();
        this.scene.popMatrix();

        //Display Hours
        this.scene.pushMatrix();
            this.scene.translate(0,0,0.21);
            this.scene.handHAppearance.apply();
            this.handH.display();
        this.scene.popMatrix();
};
