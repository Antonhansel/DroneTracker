/* 
* @Author: antonhansel
* @Date:   2015-01-17 10:45:39
* @Last Modified by:   antonhansel
* @Last Modified time: 2015-01-21 14:04:09
*/
var speed = 2;
var fs = require('fs');
// var write = false;
// var file = fs.createWriteStream('./config/fakeNavData.txt');
var navigationData = [];
var index = 0;
//var detection 		= require('../modules/detection');
var config 			= require('../config/config.js');

module.exports = function(droneSocket, io){
	if (!config.dev) var pngStream = droneSocket.getPngStream();
	io.on('connection', function(socket){
		console.log('Socket connected');
		/////////////////////////////////////////////////////////////
		//image handling stuff
		var lastFrame;
		if (!config.dev){
			pngStream.on('error', console.error).on('data', function(pngBuffer){
				socket.emit('frame', pngBuffer.toString('base64'));
				// detection.matrixHandler(pngBuffer, function(result){
				// 	if (result.length > 0) console.log(result);
				// });
			});
		}
		// droneSocket.on('navdata', function(navdata){
		// 	if (navigationData.length < 150){
		// 		navigationData.push(navdata);
		// 	} else if (write == false){
		// 		write = true;
		// 		navigationData.forEach(function(line){
		// 			file.write(JSON.stringify(line) + '\n');
		// 		});
		// 	}
		// });
		/////////////////////////////////////////////////////////////
		//Navdata handler
		if (!config.dev){
			droneSocket.on('navdata', function(navdata){
				socket.emit('navdata', navdata);
			});
		} else {
			if (navigationData.length == 0){
				fs.readFile('./config/test.txt', function(err, data){
					if (err) console.log('Error when opening fake data file: ' + err);
					else {
						data.toString().split('\n').forEach(function(line){
							navigationData.push(JSON.parse(line));
						});
					}
				});
			} else {
				setInterval(function(data){ 
				if (index > navigationData.length) index = 0;
				else index++;
				socket.emit('navdata', navigationData[index]);
				}, 50);
			}
		}
		/////////////////////////////////////////////////////////////
		//Other commands
		socket.on('speed', function(data){
			if ((speed + data.speed) > -1 && (speed + data.speed) < 11){
				speed += data.speed;
				socket.emit('speed', {'speed': speed});
				console.log('Speed:' + speed/10);
			}
		});
		socket.on('land', function(){
			console.log('Landing...');
			droneSocket.stop();
			droneSocket.land();
		});
		socket.on('takeoff', function(){
			console.log('Taking off...');
			droneSocket.stop();
			droneSocket.takeoff();
		});
		socket.on('recover', function(){
			console.log('Disabling emergency...');
			droneSocket.stop();
			droneSocket.disableEmergency();
		});
		////////////////////////////
		///////////MOVEMENTS////////
		socket.on('forward', function(){
			console.log('Going forward...');
			droneSocket.stop();
			droneSocket.front(speed/10);
		});
		socket.on('backward', function(){
			console.log('Going backward...');
			droneSocket.stop();
			droneSocket.back(speed/10);
		});
		socket.on('up', function(){
			console.log('Going up...');
			droneSocket.stop();
			droneSocket.up(0.3);
		});
		socket.on('down', function(){
			console.log('Going down...');
			droneSocket.stop();
			droneSocket.down(0.3);
		});
		socket.on('rotateRight', function(){
			console.log('Rotating left...');
			droneSocket.stop();
			droneSocket.counterClockwise(0.5);
		});
		socket.on('rotateLeft', function(){
			console.log('Rotating right...');
			droneSocket.stop();
			droneSocket.clockwise(0.5);
		});
		socket.on('stop', function(){
			console.log('Stop...');
			droneSocket.stop();
		});
	});
}