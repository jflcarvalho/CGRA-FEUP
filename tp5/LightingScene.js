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

    this.enableTextures(true);
    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.table = new MyTable(this);
    this.wall = new Plane(this);
    this.leftWall = new MyQuad(this, -1, 2, -0.5, 1.5);
    this.floor = new MyQuad(this, 0, 2, 0, 2);
    this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.3, 1.3, 0, 1);
    this.boardB = new Plane(this, BOARD_B_DIVISIONS);
    this.columnLeft = new MyCylinderWithTops(this, 20, 20);
    this.columnRight = new MyCylinderWithTops(this, 20, 20);
    this.lamp = new MyLamp(this, 12, 10);
    this.clock = new MyClock(this);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.tableAppearance = new CGFappearance(this);
    this.tableAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.tableAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.tableAppearance.setSpecular(0.7, 0.8, 0.8, 1);
    this.tableAppearance.setShininess(100);
    this.tableAppearance.loadTexture("../resources/images/marble.jpg");

    this.legMaterial = new CGFappearance(this);
    this.legMaterial.setAmbient(1, 1, 1, 1);
    this.legMaterial.setDiffuse(1, 1, 1, 1);
    this.legMaterial.setSpecular(1, 1, 1, 1);
    this.legMaterial.setShininess(200);
    this.legMaterial.loadTexture("../resources/images/legs.jpg");


    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.floorAppearance.setDiffuse(1, 1, 1, 1);
    this.floorAppearance.setSpecular(1, 1, 1, 1);
    this.floorAppearance.setShininess(255);
    this.floorAppearance.loadTexture("../resources/images/floor2.jpg");
    this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.rightWall = new CGFappearance(this);
    this.rightWall.setAmbient(0.1, 0.1, 0.1);
    this.rightWall.setDiffuse(0.2, 0.2, 0.2);
    this.rightWall.setSpecular(0.8, 0.8, 0.8);
    this.rightWall.setShininess(0.5);
    this.rightWall.loadTexture("../resources/images/wall.jpg");
    this.rightWall.setTextureWrap('REPEAT', 'REPEAT');


    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.windowAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.windowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.windowAppearance.setShininess(50);
    this.windowAppearance.loadTexture("../resources/images/window.png");
    this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.slidesAppearance.setShininess(50);
    this.slidesAppearance.loadTexture("../resources/images/slides.png");
    this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.boardAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.boardAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.boardAppearance.setShininess(50);
    this.boardAppearance.loadTexture("../resources/images/board.png");

    this.columnAppearance = new CGFappearance(this);
    this.columnAppearance.setAmbient(0.4, 0.4, 0.4, 1);
    this.columnAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.columnAppearance.setSpecular(0.8, 0.8, 0.8, 1);
    this.columnAppearance.setShininess(50);
    this.columnAppearance.loadTexture("../resources/images/MarbleWhite.jpg");

    this.lampAppearance = new CGFappearance(this);
    this.lampAppearance.setAmbient(0.5, 0.5, 0.5, 0.7);
    this.lampAppearance.setDiffuse(0.8, 0.8, 0.8, 0.7);
    this.lampAppearance.setSpecular(0.2, 0.2, 0.2, 0.8);
    this.lampAppearance.setShininess(50);
    this.lampAppearance.loadTexture("../resources/images/Artwork2.jpg");

    this.setUpdatePeriod(1000);

};

LightingScene.prototype.update = function(currTime) {
    this.lastTime = this.lastTime | 0;
    this.deltaTime = currTime - this.lastTime;
    //console.log(this.deltaTime);
    this.clock.update(this.deltaTime);
    this.lastTime = currTime;
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0.2, 0.2, 0.1, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(20, 6, 10, 1.0);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[3].setVisible(true);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    this.lights[4].setPosition(0, 4, 7.5, 1);
    this.lights[4].setVisible(true);
    //LAmp
    this.lights[5].setPosition(7.5, 8, 7.5);
    this.lights[5].setVisible(true);


    this.lights[0].setSpecular(0.9, 1, 1, 1);
    this.lights[0].setDiffuse(0.78, 1.0, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(0.9, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setVisible(true);
    this.lights[2].setSpecular(1, 1, 0.78, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].enable();


    this.lights[3].setSpecular(1, 1, 0.78, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 0.78, 1.0);
    this.lights[3].setConstantAttenuation(0);
    this.lights[3].setQuadraticAttenuation(0.2);
    this.lights[3].enable();

    this.lights[4].setSpecular(1, 1, 1, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1, 1.0);
    this.lights[4].setConstantAttenuation(1);
    this.lights[4].enable();

    //Lamp LIght
    this.lights[5].setSpecular(1, 1, 0.78, 1);
    this.lights[5].setDiffuse(1, 1, 0.78, 1);
    this.lights[5].setConstantAttenuation(0);
    this.lights[5].enable();
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}


LightingScene.prototype.display = function() {
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
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.floor.display();
    this.popMatrix();

    // Left Wall
    this.windowAppearance.apply();
    this.pushMatrix();
    this.translate(0, 4, 7.5);
    this.rotate(90 * degToRad, 0, 1, 0);
    this.scale(15, 8, 0.2);
    this.leftWall.display();
    this.popMatrix();

    // Plane Wall
    this.rightWall.apply();
    this.pushMatrix();
    this.translate(7.5, 4, 0);
    this.scale(15, 8, 0.2);
    this.wall.display();
    this.popMatrix();

    // First Table
    this.pushMatrix();
    this.translate(5, 0, 8);
    this.table.display();
    this.popMatrix();

    // Second Table
    this.pushMatrix();
    this.translate(12, 0, 8);
    this.table.display();
    this.popMatrix();

    // Board A
    this.pushMatrix();
    this.translate(4, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

    this.slidesAppearance.apply();
    this.boardA.display();
    this.popMatrix();

    // Board B
    this.pushMatrix();
    this.translate(10.5, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.boardAppearance.apply();
    this.boardB.display();
    this.popMatrix();

    //Column left
    this.pushMatrix();
    this.rotate(Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    this.translate(1, 1, -1);
    this.columnAppearance.apply();
    this.columnLeft.display();
    this.popMatrix();

    //Column right
    this.pushMatrix();
    this.rotate(Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    this.translate(14, 1, -1);
    this.columnAppearance.apply();
    this.columnLeft.display();
    this.popMatrix();

    //Lamp
    this.pushMatrix();
    this.rotate(Math.PI / 2, 1, 0, 0);
    this.translate(7.5, 7.5, -8);
    this.lampAppearance.apply();
    this.lamp.display();
    this.popMatrix();

    //clock
    this.pushMatrix();
    this.translate(7.5, 7.3, 0);
    this.scale(0.5, 0.5, 1);
    this.materialDefault.apply();
    this.clock.display();
    this.popMatrix();

    //this.shader.unbind();
    // ---- END Primitive drawing section
};