/**
 * MyHelice
 * @constructor
 */
function MyHelice(scene, radius, width) {
    CGFobject.call(this, scene);
    this.radius = radius || 1;
    this.width = width || 1;
    this.outCylinder = new MyDoubleSideCylinder(scene, 16, 4, this.radius);
    this.parallelepiped = new MyParallelepiped3D(scene, 0.05, 0.37, 0.01);
    this.semiSphere = new MySemiSphere(scene, 16, 8, this.radius / 4);
    this.heliceAngle = 0;
};

MyHelice.prototype = Object.create(CGFobject.prototype);
MyHelice.prototype.constructor = MyHelice;

MyHelice.prototype.display = function() {
    //Display OutCylinder
    this.scene.pushMatrix();
    this.scene.scale(1, 1, this.width);
    this.outCylinder.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(this.heliceAngle * Math.PI / 180.0, 0, 0, 1);
    this.scene.translate(0, 0, this.width / 2.0);
    this.parallelepiped.display();
    this.semiSphere.display();
    this.scene.popMatrix();

};

MyHelice.prototype.update = function(deltaTime, rpm) {
    this.heliceAngle = this.heliceAngle + deltaTime * 0.36 * rpm;
    if (Math.abs(this.heliceAngle) >= 360) {
        this.heliceAngle = this.heliceAngle % 360;
    }
};