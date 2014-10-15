/* 
* @Author: antonhansel
* @Date:   2014-10-15 14:48:01
* @Last Modified by:   antonhansel
* @Last Modified time: 2014-10-15 14:54:23
*/

module.exports = function(droneSocket)
{
	var readline = require('readline');

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', function (cmd) {
		if (cmd == "on")
		{
			droneSocket.stop();
			droneSocket.takeoff();
		}
		else if (cmd == "off")
		{
			droneSocket.stop();
			droneSocket.land();
		}
		if (cmd == "stop")
		{
			console.log("Stopping all drone actions...");
			droneSocket.stop();
		}
	});
}
