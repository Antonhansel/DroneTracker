function initModel(){
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
       object.rotation.y = 90;
       drone = object;
       scene.add(drone);
    }, onProgress, onError);
}

function moveModel(){
    socket.on('navdata', function(data){
        navdata = data;
        scene.updateMatrixWorld();
        myArr = data;
        drone.translateY(-oldY);
        oldY = myArr.demo.altitude * 4;
        drone.translateY(oldY);
    });
}

function initGrid(){
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
}
function initPlane(){
    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('../staticImage')
    });
    //img.map.needsUpdate = true; //ADDED
    // plane
    var imgDisplay = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), img);
    //imgDisplay.overdraw = true;
    //scene.add(imgDisplay);
}