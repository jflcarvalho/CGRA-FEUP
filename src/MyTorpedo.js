/**
 * MyTorpedo
 * @constructor
 */
function MyTorpedo(scene) {
    CGFobject.call(this, scene);
    this.position = [0, 0, 0];
    this.direction = [0, 0, 0];
    this.p1 = [0, 0, 0]; //x,y,z
    this.p2 = [0, 0, 0];
    this.p3 = [0, 0, 0];
    this.p4 = [0, 0, 0];
    this.t = 0;
    this.angle = 0;
    this.inclination = 0;
    this.mainBodyMid = new MyCylinder(scene, 16, 8, 0.5);
    this.mainBodyFront = new MySemiSphere(scene, 16, 60, 0.5);
    this.mainBodyBack = new MySemiSphere(scene, 16, 8, 0.5);
    this.backHorizontalWing = new MyTrapeze3D(scene, 1.7, 1.42, 0.3, 0.1);
    this.backVerticalWing = new MyTrapeze3D(scene, 2.34, 1.64, 0.3, 0.1);
    this.explosion = new MyExplosion(this.scene, this.scene.NumParticles, this.scene.Duration, this.scene.ParticlesMinSize, this.scene.ParticlesMaxSize);
    this.explosion.createParticles();
}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.setInitialPos = function(x, y, z, angle, inclination) {
    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;
    this.p1[0] = x;
    this.p1[1] = y;
    this.p1[2] = z;
    console.log("P1: ", this.p1);
    //console.log("Angle: ", angle);

    this.p2[0] = x + 6 * Math.cos(inclination) * Math.sin(angle);
    this.p2[1] = y + 6 * Math.sin(inclination);
    this.p2[2] = z + 6 * Math.cos(inclination) * Math.cos(angle);
    console.log("P2: ", this.p2);

    this.angle = angle;
    this.inclination = inclination;

    this.distance = Math.sqrt(Math.pow(this.p4[0] - this.p1[0], 2) + Math.pow(this.p4[1] - this.p1[1], 2) + Math.pow(this.p4[2] - this.p1[2], 2))
    console.log("Distance: ", this.distance);
}

MyTorpedo.prototype.updateT = function(deltaTime) {
    if (this.t < 1) {
        // console.log("deltaTime: ", deltaTime * 0.001);
        this.t += deltaTime * 0.001 / this.distance;
        if (this.t > 1) {
            this.t = 1;
        }
        //console.log("Tempo: ", this.t);

        //console.log("Old Position: ", this.position);
        this.position[0] =
            Math.pow((1 - this.t), 3) * this.p1[0] +
            3 * this.t * Math.pow((1 - this.t), 2) * this.p2[0] +
            3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3[0] +
            Math.pow(this.t, 3) * this.p4[0];

        this.position[1] =
            Math.pow((1 - this.t), 3) * this.p1[1] +
            3 * this.t * Math.pow((1 - this.t), 2) * this.p2[1] +
            3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3[1] +
            Math.pow(this.t, 3) * this.p4[1];

        this.position[2] =
            Math.pow((1 - this.t), 3) * this.p1[2] +
            3 * this.t * Math.pow((1 - this.t), 2) * this.p2[2] +
            3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3[2] +
            Math.pow(this.t, 3) * this.p4[2];

        //console.log("New Position: ", this.position);


        //console.log("Old direction: ", this.direction);
        this.direction[0] = -3 * (this.p1[0] * Math.pow(this.t - 1, 2) +
            this.p2[0] * (-3 * Math.pow(this.t, 2) + 4 * this.t - 1) +
            this.t * (3 * this.p3[0] * this.t - 2 * this.p3[0] -
                this.p4[0] * this.t));

        this.direction[1] = -3 * (this.p1[1] * Math.pow(this.t - 1, 2) +
            this.p2[1] * (-3 * Math.pow(this.t, 2) + 4 * this.t - 1) +
            this.t * (3 * this.p3[1] * this.t - 2 * this.p3[1] -
                this.p4[1] * this.t));

        this.direction[2] = -3 * (this.p1[2] * Math.pow(this.t - 1, 2) +
            this.p2[2] * (-3 * Math.pow(this.t, 2) + 4 * this.t - 1) +
            this.t * (3 * this.p3[2] * this.t - 2 * this.p3[2] -
                this.p4[2] * this.t));

        //console.log("New direction: ", this.direction);

        if (this.direction[0] > 0)
            this.angle = Math.atan(this.direction[2] / -this.direction[0]) + Math.PI / 2;
        else if (this.direction[0] < 0)
            this.angle = -(Math.atan(this.direction[2] / this.direction[0]) + Math.PI / 2);
        else if (this.direction[0] == 0)
            this.angle = 0;
        if (this.direction[1] > 0)
            this.inclination = -Math.atan(Math.sqrt(Math.pow(this.direction[0], 2) + Math.pow(this.direction[2], 2)) / this.direction[1]) + Math.PI / 2;
        else if (this.direction[1] < 0)
            this.inclination = -Math.atan(Math.sqrt(Math.pow(this.direction[0], 2) + Math.pow(this.direction[2], 2)) / this.direction[1]) - Math.PI / 2;
        else if (this.direction[1] == 0)
            this.inclination = 0;

        //console.log("Angle: ", this.angle);
        //console.log("Inclination: ", this.inclination);
    } else {
        this.explosion.updatePositions(deltaTime);
        if (this.explosion.done == true) {
            console.log("Delete torpedo");
            this.canDelete = true;
        }
    }
}

MyTorpedo.prototype.display = function() {
    if (this.t < 1) {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(-this.inclination, 1, 0, 0);
        this.scene.translate(0, 0, -2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.displayMainBody();
        this.displayWings();
        this.scene.popMatrix();
    } else {
        this.scene.pushMatrix();
        this.scene.embersAppearance.apply();
        this.explosion.display();
        this.scene.popMatrix();
    }

}

MyTorpedo.prototype.displayMainBody = function() {
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
    this.scene.popMatrix();
}

MyTorpedo.prototype.displayWings = function() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.3);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.backHorizontalWing.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.translate(0, -0.3, 0);
    this.backVerticalWing.display();
    this.scene.popMatrix();
}

MyTorpedo.prototype.setTarget = function(targetPosition) {
    this.p4 = targetPosition;
    this.p3[0] = targetPosition[0];
    this.p3[1] = targetPosition[1] + 3;
    this.p3[2] = targetPosition[2];
    console.log("P3: ", this.p3);
    console.log("P4: ", this.p4);

    this.explosion.setLocation(this.p4);
}