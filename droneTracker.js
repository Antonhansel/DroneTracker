//////////////////////////////////////////////////////////////
//Initialize stuff
var config = require('./config/config.js');
var drone = require('ar-drone');
var droneSocket = drone.createClient();
var http = require('http');
var _ = require('lodash');
var cmdLine = require("./modules/commandLine")(droneSocket);
var detection = require("./modules/detection");

/////////////////////////////////////////////////////////////
//Api stuff
var express = require("express");
var api = express();
var router = express.Router();
var bodyParser = require("body-parser");

api.use(bodyParser.json());
router.use(function(req, res, next){
	console.log("Request: " + req);
	next();
});
api.use("/api", router); api.listen(config.apiPort);
console.log("Api listening on port " + config.apiPort);

var navData = require("./api/navData")(droneSocket, router);

/////////////////////////////////////////////////////////////
//image handling stuff
var lastFrame;
var pngStream = droneSocket.getPngStream();

pngStream.on('error', console.log).on('data', function(pngBuffer){
	lastFrame = pngBuffer;
	detection.matrixHandler(pngBuffer);
})
//piping pngstream to opencv handler

/////////////////////////////////////////////////////////////
//Serving images on port 8080 for app
var server = http.createServer(function(req, res){
	if (!lastFrame){
		res.writeHead(503);
		res.end("No data");
	}
	else{
		res.writeHead(200, {'Content-Type:': 'image/png'});
		res.end(lastFrame);
	}
});

server.listen(config.imagePort);
console.log("Serving images on port "+ config.imagePort);
