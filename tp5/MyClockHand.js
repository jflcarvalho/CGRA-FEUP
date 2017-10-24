/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene) {
    CGFobject.call(this, scene);
    this.hand = new MyCylinder(scene, 4, 1);
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle;
    console.log(angle);
    this.rotation = this.deg2rad * angle;
};

MyClockHand.prototype.display = function() {
    this.scene.pushMatrix();
    //this.scene.rotate(Math.PI / 2, -1, 0, 0);
    //this.scene.scale(1, 1, 0.2);
    console.log(this.rotation);
    this.scene.rotate(this.rotation, 0, 0, 1);
    this.hand.display();
    this.scene.popMatrix();
};