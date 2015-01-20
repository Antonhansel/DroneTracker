var scene = new THREE.Scene();
var drone;
var line;
var oldY = 0;
var imgDisplay;
var navData = 0;
var lastFrame;
var newFrame = false;
var newData = false;
var oculusView = false;
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
		if (newData) {
			// //scene.updateMatrixWorld();
			line.translateY(navData.demo.altitude * 4);
			line.translateY(-data.demo.altitude * 4);
			drone.rotation.x = data.demo.frontBackDegrees / 50;
			drone.rotation.z = data.demo.leftRightDegrees / 50;
			newData = false;
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
		if (!newData && navData != 0){
			newData = true;
			navData = data;
		} else if (navData == 0){
			//first run of the api
			navData = data;
			newData = true;
		}
	});
	socket.on('frame', function(data){
		if (!newFrame){
			lastFrame = data;
			newFrame = true;
		}
		// imgDisplay.overdraw = true;
		// imgDisplay.material.map.needsUpdate = true;
	});
});