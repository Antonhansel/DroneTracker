var cv = require('opencv');

var detectFace = function(image, callback){
	image.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
		callback(faces);
	});
}

var detectBody = function(image, callback){
	image.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
		console.log(faces.length + " body detected");
			callback(faces);
	});	
}

exports.matrixHandler = function matrixHandler(matrix, callback){
	var results = [];
	cv.readImage(matrix, function(err, img){
		detectFace(img, function(result){
				results.push(result);
		});
		// detectBody(img, function(result){
		// 		results.push(result);
		// });
		callback(results);
	});
};

