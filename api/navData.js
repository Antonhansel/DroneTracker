module.exports = function(droneSocket, router)
{
	var lastData = "none";

	droneSocket.on('navdata', function(navdata){
		lastData = navdata;
	});

	router.get("/navdata", function(req, res){
		res.json(lastData);
	});
}
