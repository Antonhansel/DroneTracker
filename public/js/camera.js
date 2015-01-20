function initCamera(){
	oculuscontrol = new THREE.OculusControls(camera);
	//oculuscontrol.connect(); //no server for now
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

	camera.position.z = 10;
	camera.position.y = 6;
	camera.position.x = 0;
	effect = new THREE.OculusRiftEffect(renderer, {worldScale: 100});
	effect.setSize(window.innerWidth, window.innerHeight);
}