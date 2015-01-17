jQuery(function(){
	/////////////////////////
	/////////////////////////

	var gui = new dat.GUI();
	var parameters = 
	{
		a: function() { sendAction('land'); },
		b: function() { sendAction('takeoff'); },
		c: function() { sendAction('emergency'); },
	};
	// gui.add( parameters )
	gui.add(parameters, 'a').name('Land');
	gui.add(parameters, 'b').name('Take Off');
	gui.add(parameters, 'c').name('Recover Emergency');
	gui.open();
});
