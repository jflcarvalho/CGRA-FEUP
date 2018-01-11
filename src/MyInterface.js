/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a button:
    // the first parameter is the object that is being controlled (in this case the scene)
    // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
    // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

    // add a group of controls (and open/expand by defult)

    var lightsGroup = this.gui.addFolder("Control Lights");

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    lightsGroup.add(this.scene, 'light1');
    lightsGroup.add(this.scene, 'light2');
    lightsGroup.add(this.scene, 'light3');
    lightsGroup.add(this.scene, 'light4');
    lightsGroup.add(this.scene, 'light5');

    

    var materialsGroup = this.gui.addFolder("Change Textures");
    materialsGroup.add(this.scene, 'currSubmarineAppearance', Object.keys(this.scene.submarineAppearanceList));


    var targetGroup = this.gui.addFolder("Select Target");
    targetGroup.add(this.scene, 'currTargetSelect', Object.keys(this.scene.targetsList));

    var explosionGroup = this.gui.addFolder("Explosion Settings");
    explosionGroup.add(this.scene, 'NumParticles',10,200);
    explosionGroup.add(this.scene, 'Duration',500,3000);
    explosionGroup.add(this.scene, 'ParticlesMinSize',0.01,0.1);
    explosionGroup.add(this.scene, 'ParticlesMaxSize',0.1,0.5);

    this.gui.add(this.scene, 'enableClock');

    this.gui.add(this.scene, 'AnimationSpeed', 1, 240);


    return true;
};

//process Lights
MyInterface.prototype.processLights = function(lightId, trueOrFalse) {
    this.scene.turnLight(lightId, trueOrFalse);
}

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this, event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

    this.acceleration = 1;
    this.deltaHeight = 0.05;
    this.deltaInclination = 0.034906585; //2 degrees
    this.key = event.keyCode;
    if (this.key >= 97) {
        this.key -= 32;
    }
    switch (this.key) {
        case (65)://A pressed
            this.scene.rotateSubmarine(2);
            break;
        case (68): //D pressed
            this.scene.rotateSubmarine(-2);
            break;
        case (69): //E pressed
            this.scene.setSubmarineInclination(-this.deltaInclination);
            break;
        case (81): //Q pressed
            this.scene.setSubmarineInclination(this.deltaInclination);
            break;
        case (87)://W pressed    
            this.scene.setAcceleration(this.acceleration);
            break;
        case (83): //S pressed
            this.scene.setAcceleration(-this.acceleration);
            break;
        case (80): //P pressed
            this.scene.setPeriscopeHeight(this.deltaHeight);
            break;
        case (76): //L pressed
            this.scene.setPeriscopeHeight(-this.deltaHeight);
            break;
        case (70): //F pressed
            this.scene.lockTarget();
            break;
    };
};