jQuery(function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	oculuscontrol = new THREE.OculusControls(camera);
	var clock = new THREE.Clock();
	oculuscontrol.connect();
	renderer.setSize(window.innerWidth, window.innerHeight);
	/////////////////////////////
	/////////////////////////////
	effect = new THREE.OculusRiftEffect(renderer, {worldScale: 1});
	effect.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild(renderer.domElement);
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

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;
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

	var oldY = 0;
	function httpGet(){
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/api/navdata";
			//xmlhttp.crossDomain = true;
			xmlhttp.onreadystatechange = function(){
				var myArr = [];
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					scene.updateMatrixWorld();
					myArr = JSON.parse(xmlhttp.responseText);
					cube.translateY(-oldY);
					oldY = myArr.demo.altitude * 4;
					cube.translateY(oldY);
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		};
		var render = function (){
			var t = clock.getElapsedTime();
			controls.update(clock.getDelta());
			requestAnimationFrame(render);
			oculuscontrol.update(clock.getDelta());
			// renderer.render(scene, camera);
			effect.render(scene, camera);
		};
		var isUpdating = false;
		var updatingId;
		var startUpdating = function(){
			if (isUpdating == false)
				updatingId = setInterval(httpGet, 50);
			else clearInterval(updatingId);
			isUpdating = !isUpdating;
		};
		/////////////////////////
		/////////////////////////
		httpGet();
		render();
	});		