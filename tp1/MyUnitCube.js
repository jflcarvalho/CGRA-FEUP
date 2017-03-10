/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
			-0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
			];

	this.indices = [
            0, 1, 2, //face diateira 
			3, 2, 1,
			4, 1, 0, //face inferior
			5, 1, 4,
			1, 5, 7, //face lateral direita
			7, 3, 1,
			3, 7, 6, //face superior
			6, 2, 3,	
			2, 6, 4, //face lateral esquerda
			4, 0, 2, 
			7, 5, 4, //face de traseira
			4, 6, 7,  
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};