var draw = function(size, step)
{
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