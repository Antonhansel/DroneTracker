/* 
* @Author: antonhansel
* @Date:   2015-01-16 11:04:29
* @Last Modified by:   antonhansel
* @Last Modified time: 2015-01-16 11:42:13
*/

module.exports = function(droneSocket, app, router){
	 app.get('/', function(req, res){
        res.render('index.ejs');
    });

	var navData = require('./navData')(droneSocket, router);

	router.get('/takeoff', function(req, res){
		console.log('Taking off...');
		droneSocket.stop();
		droneSocket.takeoff();
		res.send();
	});

	router.get('/land', function(req, res){
		console.log('Landing...');
		droneSocket.stop();
		droneSocket.land();
		res.send();
	});

	router.get('/emergency', function(req, res)
	{
		console.log('Disabling Emergency mode...');
		droneSocket.disableEmergency();
		res.send();
	});	
}