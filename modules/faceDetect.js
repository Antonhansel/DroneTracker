var faceCount = 0;

exports.matrixHandler = function matrixHandler(matrix, cv, droneSocket)
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
			//matrix.ellipse(saveFace.x + saveFace.width/2, saveFace.y + saveFace.height/2, saveFace.width/2, saveFace.height/2);
			console.log ("POSITION:x=" + saveFace.x + " - x.y" + saveFace.y);
			console.log("SIZE" + saveFace.width);
			if (saveFace.width > 50)
			{
				if (saveFace.width > 70)
				{
					droneSocket.stop();
					console.log("Back");
				}
				if (saveFace.x < 150)
				{
					droneSocket.stop();
					console.log("rotate left");
					droneSocket.counterClockwise(0.5);
					droneSocket.after(100, function() {
						this.stop();
					})
				}
				else if (saveFace.x > 300)
				{
					droneSocket.stop();
					console.log("rotate right");
					droneSocket.clockwise(0.5);
					droneSocket.after(100, function() {
						this.stop();
					})
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
};