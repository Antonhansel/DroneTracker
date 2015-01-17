/* 
* @Author: antonhansel
* @Date:   2015-01-17 10:45:39
* @Last Modified by:   antonhansel
* @Last Modified time: 2015-01-17 14:37:11
*/
var speed = 0.1;

module.exports = function(droneSocket, io){
	io.on('connection', function(socket){
		console.log('Web view connected');
			var lastData = "none";
		droneSocket.on('navdata', function(navdata){
			lastData = navdata;
			socket.emit('navdata', navdata)
		});
		socket.on('speed', function(data){
			if ((speed += data.speed) > 0 && (speed += data.speed) < 1.1)
			speed += data.speed;
			socket.emit('speed', {'speed': speed});
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
	});
}