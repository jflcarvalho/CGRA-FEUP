/**
 * MyIsland
 * @constructor
 */
function MyIsland(scene, positionX,positionY,positionZ) {
    CGFobject.call(this, scene);
    this.position = [positionX,positionY,positionZ];
    this.land = new MySemiSphere(scene, 16, 16, 5);

};

MyIsland.prototype = Object.create(CGFobject.prototype);
MyIsland.prototype.constructor = MyIsland;

MyIsland.prototype.display = function(){
    this.scene.sandAppearance.apply();
    this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2])
        this.scene.scale(1,0.3,1);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.land.display();
    this.scene.popMatrix();
}