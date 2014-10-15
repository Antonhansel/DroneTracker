var cv = require('opencv');
var drone = require('ar-drone');
var s = new cv.ImageStream()
var _ = require('lodash');

var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var droneSocket = drone.createClient();
//droneSocket.disableEmergency();

rl.on('line', function (cmd) {
	if (cmd == "on")
	{
		droneSocket.stop();
		droneSocket.takeoff();
	}
	else if (cmd == "off")
	{
		droneSocket.stop();
		droneSocket.land();
	}
});

//droneSocket.takeoff();
// droneSocket.after(10000, function() {
//     this.land();
//   });
//droneSocket.on("navdata", console.log);

s.on('data', _.throttle(function(matrix)
{
	matrix.detectObject(cv.FACE_CASCADE, {}, function(err, faces)
	{
		var trueFace = 0;
		var saveFace;
		for (var i=0;i<faces.length; i++)
		{
			var x = faces[i];
			if (trueFace < (x.width + x.height))
			{
				trueFace = x.width + x.height;
				saveFace = faces[i];
			}
		}
		if (trueFace > 0)
		{
			//console.log ("x:x=" + saveFace.x + " - x.y" + saveFace.y);
			//console.log("x:width " + saveFace.width + " - x.height" + saveFace.height);
			if (saveFace.width > 70 && saveFace.height > 70)
			{
				if (saveFace.x < 100)
				{
					droneSocket.stop();
					console.log("rotate left");
					droneSocket.counterClockwise(0.1);
				}
				else if (saveFace.x > 320)
				{
					droneSocket.stop();
					console.log("rotate right");
					droneSocket.clockwise(0.1);
				}
				else
				{
					droneSocket.stop();
				}
			}
		}
		else
		{
			droneSocket.stop();
		}
	});
}, 1000))

droneSocket.getPngStream().pipe(s);

// var pngStream = droneSocket.getPngStream();
// pngStream.on('data', console.log);

// cv.readImage("./test.jpg", function(err, im){
//   im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
//     for (var i=0;i<faces.length; i++){
//       var x = faces[i]
//       im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
//     }
//     im.save('./out.jpg');
//   });
// })

