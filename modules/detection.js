var cv = require('opencv');
var faceCount = 0;

var detectFace = function(matrix){
	matrix.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
		console.log(faces.length + " face(s) detected");
	});	
}

exports.matrixHandler = function matrixHandler(matrix){
	cv.readImage(matrix, function(err, img){
		if (err) return console.log(err);
		else detectFace(img);
	});
};