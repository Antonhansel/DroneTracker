var cv = require('opencv');
var drone = require('ar-drone');
var http = require('http');
var s = new cv.ImageStream()
var _ = require('lodash');
var droneSocket = drone.createClient();
var cmdLine = require("./modules/commandLine")(droneSocket, s);
var faceDetect = require("./modules/faceDetect");

var lastFrame;
var lastData = "none";

s.on('data', _.throttle(function(matrix)
{
	faceDetect.matrixHandler(matrix, cv, droneSocket);
}, 500))

s.on('data', function(data)
{
	lastFrame = data;
})

droneSocket.on('navdata', function(navdata)
	{
		lastData = data;
	});

var server = http.createServer(function(req, res)
{
    res.writeHead(200, {'Content-Type': 'text'});
    res.write("local server up.");
    res.end();
});

server.listen(8080);

droneSocket.getPngStream().pipe(s);
