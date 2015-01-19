//////////////////////////////////////////////////////////////
//Initialize stuff
var config 			= require('./config/config.js');
var drone 			= require('ar-drone');
var express 		= require('express');
var fs 				= require('fs');
var path 			= require('path');
var http 			= require('http');
var _ 				= require('lodash');
var droneSocket 	= drone.createClient();
var cmdLine 		= require('./modules/commandLine')(droneSocket);
var io 				= require('socket.io').listen(config.apiPort);
/////////////////////////////////////////////////////////////
//Socket.io stuff
var socketHandler	= require('./api/socketHandler.js')(droneSocket, io);
console.log('API Listening on port 3000');
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
