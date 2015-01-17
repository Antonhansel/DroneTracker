var scene = new THREE.Scene();
var drone;
var oldY = 0;
var navData;
var effect;
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var socket = io('http://localhost:3000');
var keyboard	= new THREEx.KeyboardState(renderer.domElement);

//////////////////////////////
//////////////////////////////
jQuery(function(){
	
	
	//////////////////////////////
	///////// PREPARE DAT
   	function render(){
		var t = clock.getElapsedTime();
		controls.update(clock.getDelta());
		requestAnimationFrame(render);
		oculuscontrol.update(clock.getDelta());
		//renderer.render(scene, camera); //uncoment this line and 
										  //comment the next one for 
										  //single viewport activation
		effect.render(scene, camera);
	};
	//////////////////////////////
	///////// INIT DIS
	initKeyboard();
   	initModel();
   	initLights();
	initCamera();
	initGrid();
	initGui();
	render();
	//////////////////////////////
	///////// RENDER DAT
});	