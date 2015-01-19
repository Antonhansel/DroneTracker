function initGui(){
	var gui = new dat.GUI();
	var parameters = 
	{
		a: function(){ socket.emit('land'); renderer.domElement.focus();},
		b: function(){ socket.emit('takeoff'); renderer.domElement.focus();},
		c: function(){ socket.emit('recover'); renderer.domElement.focus();},
		d: function(){ socket.emit('speed', {'speed' : 1}); renderer.domElement.focus();},
		e: function(){ socket.emit('speed', {'speed' : -1}); renderer.domElement.focus();},
		f: function(){ oculusView = !oculusView; renderer.domElement.focus();},
		//g: function(){ 	camera.position.z = 10; camera.position.y = 6; camera.position.x = 0; renderer.domElement.focus();},
	};
	gui.add(parameters, 'a').name('Land');
	gui.add(parameters, 'b').name('Take Off');
	gui.add(parameters, 'c').name('Recover');
	gui.add(parameters, 'd').name('Speed +');
	gui.add(parameters, 'e').name('Speed -');
	gui.add(parameters, 'f').name('Toggle Occulus view');
	//gui.add(parameters, 'g').name('Reset camera');
	gui.open();
};
