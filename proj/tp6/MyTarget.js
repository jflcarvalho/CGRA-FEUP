function MyTarget(scene, xPosition, zPosition) {
    CGFobject.call(this, scene);
    this.visible = true;
    this.circle = new MyCircle(this.scene, 16, 0, 1, 0, 1, 1);
    this.xPosition = xPosition || 0;
    this.zPosition = zPosition || 0;
    this.yPosition = 0.1;
};



MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {
    if (this.visible) {
        this.scene.pushMatrix();
        this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.targetAppearance.apply();
        this.circle.display();
        this.scene.popMatrix();
    }
}

MyTarget.prototype.getPosition = function() {
    var position = [this.xPosition, this.yPosition, this.zPosition];
    return position;
}

MyTarget.prototype.setVisible = function(bool) {
    this.visible = bool;
}