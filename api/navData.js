module.exports = function(droneSocket)
{
	var express = require("express");
	var api = express();
	var router = express.router();
	var bodyParser = require("body-parser");
	var lastData = "none";

	api.use(bodyParser.json());
	router.use(function(req, res, next))
	{
		console.log("Request: " + req);
		next();
	}
	api.use("/api", router);
	api.listen(3000);


	droneSocket.on('navdata', function(navdata)
	{
		lastData = data;
	});

	router.get("/navdata", function(req, res)
	{
		res.json(lastData);
	}
}
