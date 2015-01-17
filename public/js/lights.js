function initLights(){
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add(ambient); 
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 1, 0, 1 );
	scene.add(directionalLight);
	renderer.setSize(window.innerWidth, window.innerHeight);
}