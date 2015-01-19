/* 
* @Author: antonhansel
* @Date:   2015-01-17 10:45:39
* @Last Modified by:   antonhansel
* @Last Modified time: 2015-01-19 13:55:22
*/
var speed = 1;

module.exports = function(droneSocket, io){
	io.on('connection', function(socket){
		console.log('Web view connected');
			var lastData = "none";
		droneSocket.on('navdata', function(navdata){
			lastData = navdata;
			socket.emit('navdata', navdata)
		});
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
			droneSocket.up(0.2);
		});
	});
}