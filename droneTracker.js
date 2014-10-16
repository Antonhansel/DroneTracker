//drone opencv and cmdline stuff
var cv = require('opencv');
var drone = require('ar-drone');
var http = require('http');
var s = new cv.ImageStream()
var _ = require('lodash');
var droneSocket = drone.createClient();
var cmdLine = require("./modules/commandLine")(droneSocket, s);
var faceDetect = require("./modules/faceDetect");

//Api stuff
var express = require("express");
var api = express();
var router = express.Router();
var bodyParser = require("body-parser");

api.use(bodyParser.json());
router.use(function(req, res, next)
{
	console.log("Request: " + req);
	next();
});
api.use("/api", router);
api.listen(3000);

var navData = require("./api/navData")(droneSocket, router);

//image handling stuff
var lastFrame;

s.on('data', _.throttle(function(matrix)
{
	faceDetect.matrixHandler(matrix, cv, droneSocket);
}, 100))

s.on('data', function(data)
{
	lastFrame = data;
})

var server = http.createServer(function(req, res)
{
	res.writeHead(200, {'Content-Type': 'image/png'});
	res.write("local server up.");
	res.end();
});

server.listen(8080);

//piping pngstream to opencv handler
droneSocket.getPngStream().pipe(s);
var stream = droneSocket.getPngStream();
