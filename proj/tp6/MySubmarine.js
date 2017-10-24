/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);
    this.angle = 0;
    this.rotateSpeed =0;
    this.inclination = 0;
    this.xPosition = 0;
    this.zPosition = 0;
    this.yPosition = 1.3;
    this.acceleration = 0;
    this.xVelocity = 0;
    this.zVelocity = 0;
    this.yVelocity = 0;
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
    this.leftHeliceRPM = -1;
    this.rightHeliceRPM = 1;
    this.backVerticalWingAngle = 0;
    this.horizontalWingsAngle = 0;
    this.periscopeHeight = 0.07;
    this.movingBackwards = 0;
    this.torpedo = null;
    this.rightBubbles = new MyBubbles(this.scene, 10, 500, 0.02, 0.08);
    this.leftBubbles = new MyBubbles(this.scene, 10, 500, 0.02, 0.08);
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
    //Display Submarine
    this.scene.pushMatrix();
    this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
    this.scene.translate(0, 0, 3.2);
    this.scene.rotate(this.angle, 0, 1, 0);
    this.scene.rotate(-this.inclination, 1, 0, 0);
    this.scene.translate(0, 0, -3.2);
    this.displayMainBody();
    this.displayPeriscope();
    this.displayHelices();
    this.displayWings();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.displayTorpedo();
    this.scene.popMatrix();
    this.displayBubbles();
    
};

MySubmarine.prototype.displayTorpedo = function() {
    if (this.torpedo != null) {
        this.torpedo.display();
    }
}

MySubmarine.prototype.displayHelices = function() {
    this.scene.pushMatrix();
    this.scene.translate(0.53, -0.25, 0);
    this.rightHelice.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-0.53, -0.25, 0);
    this.leftHelice.display();
    this.scene.popMatrix();
}

MySubmarine.prototype.displayWings = function() {
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
    this.scene.rotate(-this.backVerticalWingAngle, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.translate(0, -0.3, 0);
    this.backVerticalWing.display();
    this.scene.popMatrix();
}


MySubmarine.prototype.displayPeriscope = function() {
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


MySubmarine.prototype.displayBubbles = function() {
    this.scene.pushMatrix();
        this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
        this.scene.translate(0, 0, 3.2);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(-this.inclination, 1, 0, 0);
        this.scene.translate(0, 0, -3.2);
        this.scene.bubblesAppearance.apply();
        this.rightBubbles.display();
        this.leftBubbles.display();
    this.scene.popMatrix();

}

MySubmarine.prototype.displayMainBody = function() {
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

MySubmarine.prototype.addTorpedo = function(torpedo) {
    this.torpedo = torpedo;
}

//deltaAngle is in degrees
MySubmarine.prototype.setAngle = function(deltaAngle) {
    if (deltaAngle > 0){
        this.rotateSpeed = Math.PI/3;
    }else {
        this.rotateSpeed = -Math.PI/3;
    }
    //this.angle += deltaAngle * Math.PI / 180.0;
    this.backVerticalWingAngle += deltaAngle * 0.05;
    if (Math.abs(this.backVerticalWingAngle) > Math.PI / 6) {
        if (this.backVerticalWingAngle > 0)
            this.backVerticalWingAngle = Math.PI / 6;
        else
            this.backVerticalWingAngle = -Math.PI / 6;
    }
}

MySubmarine.prototype.setPeriscopeHeight = function(deltaHeight) {
    this.periscopeHeight += deltaHeight;
    if (this.periscopeHeight > 1) {
        this.periscopeHeight = 1;
    } else if (this.periscopeHeight < 0) {
        this.periscopeHeight = 0;
    }
}

MySubmarine.prototype.setInclination = function(deltaAngle) {
    this.inclination += deltaAngle;
    if (this.inclination > Math.PI / 2) {
        this.inclination = Math.PI / 2;
    }
    if (this.inclination < -Math.PI / 2) {
        this.inclination = -Math.PI / 2;
    }
    console.log("Inclination: ", this.inclination);
}

MySubmarine.prototype.setAcceleration = function(deltaAcceleration) {
    if (deltaAcceleration < 0) {
        this.movingBackwards = 1;
    } else {
        this.movingBackwards = 0;
    }
    this.acceleration += deltaAcceleration;
}



MySubmarine.prototype.updatePosition = function(deltaTime) {
    this.timeInSeconds = deltaTime / 1000;
    this.maxVelocity = 6;

    this.angle += this.rotateSpeed * this.timeInSeconds;
   
    //Calculate Acceleration
    this.waterResistance = -0.2;
    this.xResistanceForce = this.waterResistance * this.xVelocity * this.xVelocity;
    this.zResistanceForce = this.waterResistance * this.zVelocity * this.zVelocity;
    this.yResistanceForce = this.waterResistance * this.yVelocity * this.yVelocity;
    this.rResistanceForce = this.waterResistance * this.rotateSpeed * this.rotateSpeed;

    if (this.xVelocity < 0) {
        this.xResistanceForce = -this.xResistanceForce;
    }
    if (this.zVelocity < 0) {
        this.zResistanceForce = -this.zResistanceForce;
    }
    if (this.yVelocity < 0) {
        this.yResistanceForce = -this.yResistanceForce;
    }
    if (this.rotateSpeed < 0) {
        this.rResistanceForce = -this.rResistanceForce;
    }

    this.rotateSpeed += this.rResistanceForce * deltaTime*0.1;
    

    this.xAcceleration = this.acceleration * Math.cos(this.inclination) * Math.cos(this.angle - Math.PI / 2.0) + this.xResistanceForce;
    this.zAcceleration = this.acceleration * Math.cos(this.inclination) * Math.sin(this.angle + Math.PI / 2.0) + this.zResistanceForce;
    this.yAcceleration = this.acceleration * Math.sin(this.inclination) + this.yResistanceForce;

    var lift = (this.xVelocity * this.xVelocity + this.zVelocity * this.zVelocity) / 16 * Math.sin(2 * this.inclination);
    if (this.movingBackwards) {
        this.yAcceleration -= lift;
    } else {
        this.yAcceleration += lift;
    }
    //Calculate Velocity
    this.xVelocity = this.xVelocity + this.xAcceleration * this.timeInSeconds;
    this.zVelocity = this.zVelocity + this.zAcceleration * this.timeInSeconds;
    this.yVelocity = this.yVelocity + this.yAcceleration * this.timeInSeconds;

    if (this.xVelocity < 0.0001 && this.xVelocity > -0.0001) {
        this.xVelocity = 0;
    }
    if (this.zVelocity < 0.0001 && this.zVelocity > -0.0001) {
        this.zVelocity = 0;
    }
    if (this.yVelocity < 0.0001 && this.yVelocity > -0.0001) {
        this.yVelocity = 0;
    }
    //Limit Velocity
    if (this.xVelocity > this.maxVelocity) {
        xVelocity = this.maxVelocity;
    } else if (this.xVelocity < -this.maxVelocity) {
        xVelocity = -this.maxVelocity;
    }
    if (this.zVelocity > this.maxVelocity) {
        zVelocity = this.maxVelocity;
    } else if (this.zVelocity < -this.maxVelocity) {
        zVelocity = -this.maxVelocity;
    }
    if (this.yVelocity > this.maxVelocity) {
        yVelocity = this.maxVelocity;
    } else if (this.yVelocity < -this.maxVelocity) {
        yVelocity = -this.maxVelocity;
    }

    this.velocity = Math.sqrt(Math.pow(this.xVelocity, 2) + Math.pow(this.zVelocity, 2) + Math.pow(this.yVelocity, 2));

    //Set position
    this.xPosition = this.xPosition + this.xVelocity * this.timeInSeconds +
        0.5 * this.xAcceleration * this.timeInSeconds * this.timeInSeconds;
    this.zPosition = this.zPosition + this.zVelocity * this.timeInSeconds +
        0.5 * this.zAcceleration * this.timeInSeconds * this.timeInSeconds;
    this.yPosition = this.yPosition + this.yVelocity * this.timeInSeconds +
        0.5 * this.yAcceleration * this.timeInSeconds * this.timeInSeconds;

    //Limit Position
    if (this.xPosition > 30) {
        this.xPosition = 30;
        this.xVelocity = 0;
    } else if (this.xPosition < -30) {
        this.xPosition = -30;
        this.xVelocity = 0;
    }
    if (this.zPosition > 26.8) {
        this.zPosition = 26.8;
        this.zVelocity = 0;
    } else if (this.zPosition < -33.2) {
        this.zPosition = -33.2;
        this.zVelocity = 0;
    }
    if (this.yPosition < 1.3) {
        this.yPosition = 1.3;
        this.yVelocity = 0;
    } else if (this.yPosition > 30) {
        this.yPosition = 30;
        this.yVelocity = 0;
    }


    this.rightHeliceRPM = 1 + 2 * this.velocity;
    this.leftHeliceRPM = -1 - 2 * this.velocity;

    this.leftHelice.update(deltaTime, this.leftHeliceRPM);
    this.rightHelice.update(deltaTime, this.rightHeliceRPM);

    this.acceleration = this.acceleration / 1.25;

    if (this.backVerticalWingAngle < 0) {
        this.backVerticalWingAngle += 0.001 * deltaTime;
        if (this.backVerticalWingAngle > 0)
            this.backVerticalWingAngle = 0;
    } else if (this.backVerticalWingAngle > 0) {
        this.backVerticalWingAngle -= 0.001 * deltaTime;
        if (this.backVerticalWingAngle < 0)
            this.backVerticalWingAngle = 0;
    }

    if (this.torpedo != null) {
        if (this.torpedo.p4 != [0, 0, 0]) {
            this.torpedo.updateT(deltaTime);
        }
        if (this.torpedo.canDelete == true) {
            this.torpedo = null;
        }
    }
    var bubblesVelocity = [0,0,-this.velocity];
    if (this.movingBackwards){
        bubblesVelocity[2] = -bubblesVelocity[2];
    }
    var rightSpawn = [0.5,-0.25,0];
    var leftSpawn = [-0.5,-0.25,0];
    this.rightBubbles.setSpawn(rightSpawn);
    this.leftBubbles.setSpawn(leftSpawn);
    this.rightBubbles.setVelocity(bubblesVelocity);
    this.leftBubbles.setVelocity(bubblesVelocity);
    if (deltaTime < 5000){
        this.rightBubbles.update(deltaTime);
        this.leftBubbles.update(deltaTime);
    }
    
}