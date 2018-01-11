var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {

    CGFscene.prototype.init.call(this, application);

    this.light1 = true;
    this.light2 = true;
    this.light3 = true;
    this.light4 = true;
    this.light5 = true;
    this.lightsGUI = new Array(6);
    this.enableClock = true;
    this.AnimationSpeed = 60;
    //Explosion Variables
    this.NumParticles = 100;
    this.Duration = 1000;
    this.ParticlesMinSize = 0.05;
    this.ParticlesMaxSize = 0.2;
    //End of Explosion Variables

    this.enableTextures(true);
    this.initLights();
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clearColor(0.13, 0.62, 0.83, 1.0);
    this.gl.clearDepth(1000);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);


    this.axis = new CGFaxis(this);

    // Scene elements
    this.floor = new MyQuad(this, 0, 2, 0, 2);
    this.columnRight = new MyCylinderWithTops(this, 20, 20);
    this.clock = new MyClock(this);
    this.submarine = new MySubmarine(this);
    var brokenPosition = [-5, 0, -5];
    this.brokenSubmarine1 = new MyStaticSubmarine(this, brokenPosition);
    brokenPosition = [5, 0, 20];
    this.brokenSubmarine2 = new MyStaticSubmarine(this, brokenPosition);
    brokenPosition = [7, 0, -17];
    this.brokenSubmarine3 = new MyStaticSubmarine(this, brokenPosition);
    this.brokenSubmarine1.setAngle(-Math.PI / 4);
    this.brokenSubmarine1.setInclination(Math.PI);
    this.brokenSubmarine2.setAngle(Math.PI / 4);
    this.brokenSubmarine2.setInclination(Math.PI);
    this.brokenSubmarine3.setAngle(Math.PI / 2);
    this.brokenSubmarine3.setInclination(Math.PI);

    this.island = new MyIsland(this,-3,-1,-15);

    this.initCameras();


    // Materials
    this.materialDefault = new CGFappearance(this);

    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.floorAppearance.setDiffuse(1, 1, 1, 1);
    this.floorAppearance.setSpecular(1, 1, 1, 1);
    this.floorAppearance.setShininess(255);
    this.floorAppearance.loadTexture("../resources/images/watera.jpg");
    this.floorAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    this.columnAppearance = new CGFappearance(this);
    this.columnAppearance.setAmbient(0.4, 0.4, 0.4, 1);
    this.columnAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.columnAppearance.setSpecular(0.8, 0.8, 0.8, 1);
    this.columnAppearance.setShininess(50);
    this.columnAppearance.loadTexture("../resources/images/MarbleWhite.jpg");


    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.clockAppearance.setSpecular(0.8, 0.8, 0.8, 1);
    this.clockAppearance.setShininess(100);
    this.clockAppearance.loadTexture("../resources/images/clock.png");

    this.handSAppearance = new CGFappearance(this);
    this.handSAppearance.setAmbient(0.8, 0, 0, 1);
    this.handSAppearance.setDiffuse(1, 0, 0, 1);
    this.handSAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.handSAppearance.setShininess(100);

    this.handMAppearance = new CGFappearance(this);
    this.handMAppearance.setAmbient(0, 0.8, 0, 1);
    this.handMAppearance.setDiffuse(0, 1, 0, 1);
    this.handMAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.handMAppearance.setShininess(100);

    this.handHAppearance = new CGFappearance(this);
    this.handHAppearance.setAmbient(0, 0, 0.8, 1);
    this.handHAppearance.setDiffuse(0, 0, 1, 1);
    this.handHAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.handHAppearance.setShininess(100);

    this.targetAppearance = new CGFappearance(this);
    this.targetAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.targetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.targetAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.targetAppearance.setShininess(50);
    this.targetAppearance.loadTexture("../resources/images/target.jpg");

    this.torpedoAppearance = new CGFappearance(this);
    this.torpedoAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.torpedoAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.torpedoAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.torpedoAppearance.setShininess(50);
    this.torpedoAppearance.loadTexture("../resources/images/torpedo.jpg");

    this.rainbowAppearance = new CGFappearance(this);
    this.rainbowAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.rainbowAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.rainbowAppearance.setSpecular(1, 1, 1, 1);
    this.rainbowAppearance.setShininess(100);
    this.rainbowAppearance.loadTexture("../resources/images/rainbow.png");

    this.articAppearance = new CGFappearance(this);
    this.articAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.articAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.articAppearance.setSpecular(1, 1, 1, 1);
    this.articAppearance.setShininess(100);
    this.articAppearance.loadTexture("../resources/images/artic.jpg");

    this.metalAppearance = new CGFappearance(this);
    this.metalAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.metalAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.metalAppearance.setSpecular(1, 1, 1, 1);
    this.metalAppearance.setShininess(100);
    this.metalAppearance.loadTexture("../resources/images/metal.jpg");

    this.desertAppearance = new CGFappearance(this);
    this.desertAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.desertAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.desertAppearance.setSpecular(1, 1, 1, 1);
    this.desertAppearance.setShininess(100);
    this.desertAppearance.loadTexture("../resources/images/desert.jpg");

    this.memeAppearance = new CGFappearance(this);
    this.memeAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.memeAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.memeAppearance.setSpecular(1, 1, 1, 1);
    this.memeAppearance.setShininess(100);
    this.memeAppearance.loadTexture("../resources/images/meme.jpg");

    this.embersAppearance = new CGFappearance(this);
    this.embersAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.embersAppearance.setDiffuse(1, 1, 1, 1);
    this.embersAppearance.setEmission(0.4,0.4,0,1);
    this.embersAppearance.setSpecular(1, 1, 1, 1);
    this.embersAppearance.setShininess(255);
    this.embersAppearance.loadTexture("../resources/images/embers.jpg");

    this.rustyAppearance = new CGFappearance(this);
    this.rustyAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.rustyAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.rustyAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    this.rustyAppearance.setShininess(50);
    this.rustyAppearance.loadTexture("../resources/images/rusty.jpg");

    this.sandAppearance = new CGFappearance(this);
    this.sandAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.sandAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.sandAppearance.setSpecular(0.3, 0.3,0.3, 1);
    this.sandAppearance.setShininess(50);
    this.sandAppearance.loadTexture("../resources/images/sand.jpg");

    this.bubblesAppearance = new CGFappearance(this);
    this.bubblesAppearance.setAmbient(0.4,0.4,0.4,0.5);
    this.bubblesAppearance.setDiffuse(0.5,0.5,0.5,0.5);
    this.bubblesAppearance.setSpecular(0.8,0.8,0.8,0.5);
    this.bubblesAppearance.loadTexture("../resources/images/bubble.png");

    //Submarine Appearances
    this.submarineAppearances = [this.materialDefault, this.targetAppearance, this.memeAppearance, this.rainbowAppearance, this.articAppearance, this.desertAppearance, this.metalAppearance];
    this.submarineAppearanceList = {};
    this.submarineAppearanceList["Default"] = 0;
    this.submarineAppearanceList["Target"] = 1;
    this.submarineAppearanceList["Meme"] = 2;
    this.submarineAppearanceList["Rainbow"] = 3;
    this.submarineAppearanceList["Artic"] = 4;
    this.submarineAppearanceList["Desert"] = 5;
    this.submarineAppearanceList["Metal"] = 6;


    this.currSubmarineAppearance = "Default";

    this.targets = [
        new MyTarget(this, -5, -5), new MyTarget(this, 5, 5), new MyTarget(this, 20, 25), new MyTarget(this, -27, 14),
        new MyTarget(this, 20, -25), new MyTarget(this, 15, -5), new MyTarget(this, 1, 10),
        new MyTarget(this, -20, -15), new MyTarget(this, 5, -20), new MyTarget(this, -10, 15)
    ];
    this.targetsList = {};
    this.targetsList["Target 1"] = 0;
    this.targetsList["Target 2"] = 1;
    this.targetsList["Target 3"] = 2;
    this.targetsList["Target 4"] = 3;
    this.targetsList["Target 5"] = 4;
    this.targetsList["Target 6"] = 5;
    this.targetsList["Target 7"] = 6;
    this.targetsList["Target 8"] = 7;
    this.targetsList["Target 9"] = 8;
    this.targetsList["Target 10"] = 9;

    this.currTargetSelect = "Target 2";
    this.setUpdatePeriod(1000 / this.AnimationSpeed);

};
LightingScene.prototype.lockTarget = function() {
    if (this.targets[this.targetsList[this.currTargetSelect]].visible) {
        var targetPosition = this.targets[this.targetsList[this.currTargetSelect]].getPosition();
        console.log("Target position: ", targetPosition);
        var torpedo = new MyTorpedo(this);
        torpedo.setTarget(targetPosition);
        torpedo.setInitialPos(
            this.submarine.xPosition, this.submarine.yPosition - 0.5, this.submarine.zPosition + 3.2,
            this.submarine.angle, this.submarine.inclination);
        console.log("Initial Position: ", torpedo.position);
        this.submarine.addTorpedo(torpedo);
    }
}

LightingScene.prototype.rotateSubmarine = function(deltaAngle) {
    this.submarine.setAngle(deltaAngle * this.AnimationSpeed / 60);
}
LightingScene.prototype.setPeriscopeHeight = function(deltaHeight) {
    this.submarine.setPeriscopeHeight(deltaHeight * this.AnimationSpeed / 60);
}
LightingScene.prototype.setAcceleration = function(acceleration) {
    this.submarine.setAcceleration(acceleration);
}

LightingScene.prototype.setSubmarineInclination = function(deltaAngle) {
    this.submarine.setInclination(deltaAngle * this.AnimationSpeed / 60);
}

LightingScene.prototype.update = function(currTime) {
    this.lastTime = this.lastTime || 0;
    this.deltaTime = currTime - this.lastTime;
    this.lastTime = currTime;
    if (this.enableClock) {
        this.clock.update(this.deltaTime * this.AnimationSpeed / 60);
    }
 
    this.submarine.updatePosition(this.deltaTime * this.AnimationSpeed / 60);

    if (this.submarine.torpedo != null) {
        if (this.submarine.torpedo.t == 1) {
            this.targets[this.targetsList[this.currTargetSelect]].setVisible(false);
        } 
    }
    /*this.camera.setTarget(vec3.fromValues(this.submarine.xPosition,this.submarine.yPosition,this.submarine.zPosition+3));
    var subAngle = this.submarine.angle;
    var xCamera = this.submarine.xPosition+Math.cos(subAngle + Math.PI/2)*15 +Math.cos(subAngle + Math.PI/2)*this.submarine.velocity;
    var zCamera = this.submarine.zPosition + 3.2 -Math.cos(subAngle)*15 -Math.cos(subAngle)*this.submarine.velocity;
    this.camera.setPosition(vec3.fromValues(xCamera,this.submarine.yPosition+3,zCamera));
       */
    this.setUpdatePeriod(1000 / this.AnimationSpeed);
};



LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(1, 1, 1, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(0, 35, 0, 1.0);
    this.lights[0].setVisible(true);

    this.lights[1].setPosition(35, 35, 35, 1.0);
    this.lights[1].setVisible(true);

    this.lights[2].setPosition(35, 35, -35, 1.0);
    this.lights[2].setVisible(true);

    this.lights[3].setPosition(-35, 35, -35, 1.0);
    this.lights[3].setVisible(true);

    this.lights[4].setPosition(-35, 35, 35, 1.0);
    this.lights[4].setVisible(true);


    this.lights[0].setSpecular(0.8, 0.8, 1, 1);
    this.lights[0].setDiffuse(0.78, 0.78, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setSpecular(0.8, 0.8, 1, 1);
    this.lights[1].setDiffuse(0.78, 0.78, 1.0, 1.0);
    this.lights[1].setConstantAttenuation(1);
    this.lights[1].setLinearAttenuation(0.1);
    this.lights[1].enable();

    this.lights[2].setSpecular(0.8, 0.8, 1, 1);
    this.lights[2].setDiffuse(0.78, 0.78, 1.0, 1.0);
    this.lights[2].setConstantAttenuation(1);
    this.lights[2].setLinearAttenuation(0.1);
    this.lights[2].enable();

    this.lights[3].setSpecular(0.8, 0.8, 1, 1);
    this.lights[3].setDiffuse(0.78, 0.78, 1.0, 1.0);
    this.lights[3].setConstantAttenuation(1);
    this.lights[3].setLinearAttenuation(0.1);
    this.lights[3].enable();

    this.lights[4].setSpecular(0.8, 0.8, 1, 1);
    this.lights[4].setDiffuse(0.78, 0.78, 1.0, 1.0);
    this.lights[4].setConstantAttenuation(1);
    this.lights[4].setLinearAttenuation(0.1);
    this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
    this.lightsGUI[0] = this.light1;
    this.lightsGUI[1] = this.light2;
    this.lightsGUI[2] = this.light3;
    this.lightsGUI[3] = this.light4;
    this.lightsGUI[4] = this.light5;
    this.lightsGUI[5] = this.light6;
    for (i = 0; i < this.lights.length; i++) {
        this.lights[i].update();
        if (this.lightsGUI[i]) {
            this.lights[i].enable();
        } else {
            this.lights[i].disable();
        }
        this.lights[i].setVisible(this.lightsGUI[i]);
    }

}


LightingScene.prototype.display = function() {


    //     var d=new Date();
    //     this.last = 0 || this.last;
    //     this.curr = d.getTime();
    //     this.delta = this.curr - this.last;
    //     console.log("Delta Time =",this.delta);
    //     this.last = this.curr;

    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    //this.shader.bind();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section

    // Floor
    this.floorAppearance.apply();
    this.pushMatrix();
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(60, 60, 0.2);
    this.floor.display();
    this.popMatrix();

    //Column right
    this.pushMatrix();
    this.translate(-3, -0.5, -15);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(0.5, 0.5, 8);
    this.columnAppearance.apply();
    this.columnRight.display();
    this.popMatrix();

    //Clock
    this.pushMatrix();
    this.translate(-3, 5, -14.5);
    this.clock.display();
    this.popMatrix();
    
    //Display Targets
    this.targets[this.targetsList[this.currTargetSelect]].display();
    this.rustyAppearance.apply();
    this.brokenSubmarine1.display();
    this.brokenSubmarine2.display();
    this.brokenSubmarine3.display();
    this.island.display();

    //Submarine
    this.pushMatrix();
    this.submarineAppearances[this.submarineAppearanceList[this.currSubmarineAppearance]].apply();
    this.submarine.display();
    this.popMatrix();
    //this.shader.unbind();
    // ---- END Primitive drawing section
};
