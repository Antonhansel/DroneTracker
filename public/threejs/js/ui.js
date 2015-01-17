jQuery(function(){
	var gui = new dat.GUI();
	var parameters = 
	{
		a: function(){ socket.emit('land'); },
		b: function(){ socket.emit('takeoff'); },
		c: function(){ socket.emit('recover'); },
		d: function(){ socket.emit('speed', {'speed' : 1})},
		e: function(){ socket.emit('speed', {'speed' : -1})},
	};
	gui.add(parameters, 'a').name('Land');
	gui.add(parameters, 'b').name('Take Off');
	gui.add(parameters, 'c').name('Recover');
	gui.add(parameters, 'd').name('Speed +');
	gui.add(parameters, 'e').name('Speed -');
	gui.open();
});
