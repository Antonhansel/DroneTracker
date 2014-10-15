var cv = require('opencv');
var drone = require('ar-drone');

var droneSocket = drone.createClient();
// droneSocket.takeoff();
// droneSocket.after(10000, function() {
//     this.land();
//   });

var pngStream = droneSocket.getPngStream();
pngStream.on('data', console.log);

// cv.readImage("./test.jpg", function(err, im){
//   im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
//     for (var i=0;i<faces.length; i++){
//       var x = faces[i]
//       im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
//     }
//     im.save('./out.jpg');
//   });
// })

