var scene = new THREE.Scene();
var drone;
var line;
var oldY = 0;
var imgDisplay;
var navData;
var lastFrame;
var newFrame = false;
var oculusView = true;
var effect;
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var socket = io('http://localhost:3000');
var keyboard = new THREEx.KeyboardState(renderer.domElement);

jQuery(function(){
	//////////////////////////////
	///////// PREPARE DAT ////////
	function render(){
		// var t = clock.getElapsedTime();
		requestAnimationFrame(render);
		controls.update(clock.getDelta());
//		oculuscontrol.update(clock.getDelta());
		if (oculusView) 
			effect.render(scene, camera);
		else 
			renderer.render(scene, camera);
		if (newFrame){
			imgDisplay.material.map = new THREE.ImageUtils.loadTexture('data:image/png;base64,' + lastFrame);
			newFrame = false;
		}

	};
	//////////////////////////////
	///////// INIT DIS ///////////
	initKeyboard();
	initModel();
	initPlane();
	initLights();
	initCamera();
	initGrid();
	initGui();
	//////////////////////////////
	///////// RENDER DAT /////////
	render();
	socket.on('navdata', function(data){
		navdata = data;
		//scene.updateMatrixWorld();
		myArr = data;
		line.translateY(-oldY);
		oldY = -myArr.demo.altitude * 4;
		line.translateY(oldY);
	});
	socket.on('frame', function(data){
		lastFrame = data;
		newFrame = true;
		// imgDisplay.overdraw = true;
		// imgDisplay.material.map.needsUpdate = true;
	});
});