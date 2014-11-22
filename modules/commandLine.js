var readline = require('readline');
var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});

module.exports = function(droneSocket){
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
			console.log("Going up..., type stop to stop the drone");
			droneSocket.up(0.2);
		}
	});
}
