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