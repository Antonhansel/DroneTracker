var scene;
var drone;
var oldY = 0;
var navData;
var commands = [[83 , 'backward'], 
				[90 , 'forward'],
				[68 , 'rotateLeft'],
				[81 , 'rotateRight'],
				[38 , 'up'],
				[40 , 'down'],
				[65 , 'land'],
				[69 , 'takeoff']];

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var socket = io('http://localhost:3000');
var keyboard	= new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();

keyboard.domElement.addEventListener('keyup', function(event){
	socket.emit('stop');
})

keyboard.domElement.addEventListener('keydown', function(event){
	if (!event.repeat){
		for (var i = 0; i < commands.length; i++){
			if (commands[i][0] == event.which){
				socket.emit(commands[i][1]);
			}
		}
	}
})
//////////////////////////////
//////////////////////////////

socket.on('navdata', function(data){
	navdata = data;
	scene.updateMatrixWorld();
	myArr = data;
	drone.translateY(-oldY);
	oldY = myArr.demo.altitude * 4;
	drone.translateY(oldY);
});

jQuery(function(){
	scene = new THREE.Scene();
	oculuscontrol = new THREE.OculusControls(camera);
	var clock = new THREE.Clock();
	//oculuscontrol.connect(); no server for now

	//////////////////////////////
	//////////////////////////////
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add(ambient); 
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 1, 0, 1 );
	scene.add(directionalLight);
	renderer.setSize(window.innerWidth, window.innerHeight);
	/////////////////////////////
	/////////////////////////////
	var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
		map:THREE.ImageUtils.loadTexture('../staticImage')
	});
    //img.map.needsUpdate = true; //ADDED

    // plane
    var imgDisplay = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), img);
   	//imgDisplay.overdraw = true;
   	//scene.add(imgDisplay);

	/////////////////////////////
	/////////////////////////////
	effect = new THREE.OculusRiftEffect(renderer, {worldScale: 1});
	effect.setSize(window.innerWidth, window.innerHeight);

	controls = new THREE.TrackballControls(camera, renderer.domElement);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.2;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = false;
	controls.dynamicDampingFactor = 0.3;

	controls.minDistance = 1.1;
	controls.maxDistance = 100;

	controls.keys = [16, 17, 18];

	camera.position.z = 5;
	camera.position.y = 7;
	camera.position.x = 5;
	var size = 10, step = 4;
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0xcccccc, opacity: 0.2 });
	for (var i = - size; i <= size; i += step) {
		geometry.vertices.push(new THREE.Vector3(-size, 0, i));
		geometry.vertices.push(new THREE.Vector3(size, 0, i));
		geometry.vertices.push(new THREE.Vector3(i, 0, -size));
		geometry.vertices.push(new THREE.Vector3(i, 0, size));
	}
	var line = new THREE.Line(geometry, material, THREE.LinePieces);
	scene.add(line);
	
	var render = function (){
		var t = clock.getElapsedTime();
		controls.update(clock.getDelta());
		requestAnimationFrame(render);
		oculuscontrol.update(clock.getDelta());
			// renderer.render(scene, camera);
			effect.render(scene, camera);
		};
		render();
	});	