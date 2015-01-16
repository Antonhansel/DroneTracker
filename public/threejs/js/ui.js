/* 
* @Author: antonhansel
* @Date:   2015-01-16 11:50:17
* @Last Modified by:   antonhansel
* @Last Modified time: 2015-01-16 11:52:46
*/
jQuery(function(){
		/////////////////////////
		/////////////////////////
		var sendAction = function(toSend){
			var xmlhttp = new XMLHttpRequest();
			var url = "http://localhost:3000/api/" + toSend;
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		};
		var gui = new dat.GUI();
		var parameters = 
		{
			a: function() { sendAction("land"); },
			b: function() { sendAction("takeoff"); },
			c: function() { sendAction("emergency"); },
			d: function() { startUpdating(); },
		};
	// gui.add( parameters )
	gui.add(parameters, 'a').name('Land');
	gui.add(parameters, 'b').name("Take Off");
	gui.add(parameters, 'c').name("Recover Emergency");
	gui.add(parameters, 'd').name("Toggle updating");
	gui.open();
});