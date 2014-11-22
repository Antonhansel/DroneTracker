var readline = require('readline');

module.exports = function(droneSocket, s)
{
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', function (cmd) {
		if (cmd == "on"){
			droneSocket.stop();
			droneSocket.takeoff();
		}
		else if (cmd == "off"){
			droneSocket.stop();
			droneSocket.land();
		}
		if (cmd == "stop"){
			console.log("Stopping all drone actions...");
			droneSocket.stop();
		}
		if (cmd == "up"){
			console.log("Going up...");
			droneSocket.up(0.2);
		}
		if (cmd == "start"){
			droneSocket.getPngStream().pipe(s);
		}
	});
}
