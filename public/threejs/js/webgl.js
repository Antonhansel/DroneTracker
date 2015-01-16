var scene;
var drone;
var oldY = 0;

jQuery(function(){
	scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	oculuscontrol = new THREE.OculusControls(camera);
	var clock = new THREE.Clock();
	//oculuscontrol.connect(); no server for now

	//////////////////////////////
	//////////////////////////////
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
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

    //////////////////////////////
    //////////////////////////////
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log(item, loaded, total);
	};
	var texture = new THREE.Texture();
	var onProgress = function(xhr){
		if (xhr.lengthComputable){
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};
	var onError = function(xhr){
		console.log(xhr);
	};
	var loader = new THREE.ImageLoader( manager );
	loader.load('obj/UV_Grid_Sm.jpg', function (image){
		texture.image = image;
		texture.needsUpdate = true;
	});
	var loader = new THREE.OBJLoader(manager);

	loader.load('obj/MQ-27-2.obj', function(object){
		object.traverse( function(child){
			if (child instanceof THREE.Mesh){
				child.material.map = texture;
			}
		});
		object.position.y = 0.5;
		object.scale.x = object.scale.y = object.scale.z = 0.01;
		drone = object;
		scene.add(drone);
	}, onProgress, onError);
	/////////////////////////////
	/////////////////////////////
	effect = new THREE.OculusRiftEffect(renderer, {worldScale: 1});
	effect.setSize(window.innerWidth, window.innerHeight);

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
	
	var render = function (){
		var t = clock.getElapsedTime();
		controls.update(clock.getDelta());
		requestAnimationFrame(render);
		oculuscontrol.update(clock.getDelta());
			// renderer.render(scene, camera);
			effect.render(scene, camera);
		};
		/////////////////////////
		/////////////////////////
		// httpGet();
		render();
	});	