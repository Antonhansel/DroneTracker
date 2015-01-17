jQuery(function(){
	var gui = new dat.GUI();
	var parameters = 
	{
		a: function(){ socket.emit('land'); },
		b: function(){ socket.emit('takeoff'); },
		c: function(){ socket.emit('recover'); },
	};
	gui.add(parameters, 'a').name('Land');
	gui.add(parameters, 'b').name('Take Off');
	gui.add(parameters, 'c').name('Recover Emergency');
	gui.open();
});
