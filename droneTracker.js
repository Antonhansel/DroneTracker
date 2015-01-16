//////////////////////////////////////////////////////////////
//Initialize stuff
var config 		= require('./config/config.js');
var drone 		= require('ar-drone');
var express 	= require('express');
var path 		= require('path');
var http 		= require('http');
var _ 			= require('lodash');
var droneSocket = drone.createClient();
var cmdLine 	= require('./modules/commandLine')(droneSocket);
var detection 	= require('./modules/detection');

/////////////////////////////////////////////////////////////
//Api stuff
var api = express();
var router = express.Router();
var bodyParser = require('body-parser');
/////////////////////////////////////////////////////////////
//web view stuff
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(config.webPort);
console.log('Web UI listening on port ' + config.webPort);

api.use(bodyParser.json());
router.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

console.log('Setting up routes for API...');
require('./api/routes')(droneSocket, app, router);

api.use('/api', router); 
api.listen(config.apiPort);
console.log('API listening on port ' + config.apiPort);
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
}
/////////////////////////////////////////////////////////////
//Serving images on port 8081 for app
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
