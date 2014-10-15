var cv = require('opencv');
var drone = require('ar-drone');
var http = require('http');
var s = new cv.ImageStream()
var _ = require('lodash');
var droneSocket = drone.createClient();
var cmdLine = require("./modules/commandLine")(droneSocket);
var faceDetect = require("./modules/faceDetect");

s.on('data', _.throttle(function(matrix)
{
	faceDetect.matrixHandler(matrix, cv, droneSocket);
}, 1000))

// var server = http.createServer(function(req,res) {
// 	var client = arDrone.createClient();
// 	var pngStream = client.getPngStream();

// 	res.writeHead(200, {'Content-Type': 'image/png'});

// 	pngStream.pipe(res);

// 	pngStream.on('data', function(buffer) {
// 		console.log(buffer.length);
// 	});
// });
// server.listen(8000);

droneSocket.getPngStream().pipe(s);
