jQuery(function(){
	/////////////////////////
	/////////////////////////

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

function httpGet(){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/api/navdata";
	//xmlhttp.crossDomain = true;
	xmlhttp.onreadystatechange = function(){
		var myArr = [];
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			scene.updateMatrixWorld();
			myArr = JSON.parse(xmlhttp.responseText);
			drone.translateY(-oldY);
			oldY = myArr.demo.altitude * 4;
			drone.translateY(oldY);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};

function startUpdating(){
	var isUpdating = false;
	var updatingId;

	if (isUpdating == false)
		updatingId = setInterval(httpGet, 250);
	else clearInterval(updatingId);
	isUpdating = !isUpdating;
};

function sendAction(toSend){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/api/" + toSend;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};