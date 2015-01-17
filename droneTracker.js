//////////////////////////////////////////////////////////////
//Initialize stuff
var config 		= require('./config/config.js');
var drone 		= require('ar-drone');
var express 	= require('express');
var fs 			= require('fs');
var path 		= require('path');
var http 		= require('http');
var _ 			= require('lodash');
var droneSocket = drone.createClient();
var cmdLine 	= require('./modules/commandLine')(droneSocket);
var detection 	= require('./modules/detection');
var io 			= require('socket.io').listen(config.apiPort);
/////////////////////////////////////////////////////////////
//Socket.io stuff
console.log('API Listening on port 3000');
io.on('connection', function(socket){
	console.log('User connected:' + socket);
});
/////////////////////////////////////////////////////////////
//web view stuff
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(config.webPort);
app.get('/', function(req, res){
	res.render('index.ejs');
});
console.log('Web UI listening on port ' + config.webPort);
/////////////////////////////////////////////////////////////
//image handling stuff
var lastFrame;
if (!config.dev){
	var pngStream = droneSocket.getPngStream();

	pngStream.on('error', console.error).on('data', function(pngBuffer){
		lastFrame = pngBuffer;
		detection.matrixHandler(pngBuffer, function(result){
			if (result.length > 0) console.log(result);
		});
	})
} else {
	fs.readFile('./public/staticImage', function(err, data){
		if (err) console.log("Error while opening image:" + err);
		else lastFrame = data;
	});
}
/////////////////////////////////////////////////////////////
//Serving images on port 8081 for app, maybe switching to socket.io soon
var server = http.createServer(function(req, res){
	if (!lastFrame){
		res.writeHead(503);
		res.end('No data yet, keep waiting');
	}
	else{
		res.writeHead(200, {'Content-Type:': 'image/png'});
		res.end(lastFrame);
	}
});

server.listen(config.imagePort);
console.log('Serving images on port '+ config.imagePort);
