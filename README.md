# DroneTracker

DroneTracker brings your ARDrone experience to the next level! Connect to your drone's WiFi, fire up the server, plug in your OcculusRift and point your favorite browser to http://localhost:8080

![alt tag](https://raw.githubusercontent.com/Antonhansel/DroneTracker/master/screen.png)

DroneTracker uses a number of open source projects to work properly:

* [ThreeJS] - Enhanced webgl!
* [SocketIO] - Best networking lib ever
* [Node-Ar-Drone] - Awesome node module wrapping the ArDrone API by [Felixge]

### Installation
You need NodeJS installed. I recommend you to have nodemon installed too.

```sh
$ sudo npm install nodemon -g
```
```sh
$ git clone https://github.com/Antonhansel/DroneTracker DroneTracker
$ cd DroneTracker
$ npm install
$ nodemon droneTracker
```

You can change basic configuration of the app in /config/config.js

### Development
Want to contribute? Great! Feel free to open an issue or make a pull request!

### API
The API is a socket.io server listening on port 3000.
Making a smartphone app? No problem, for iOS use [SIOSocket], for Android [Socket.IO-java]
Open a socket.io connexion to send and recieve data:

**Sending orders**
Basic commands available:
	land, takeoff, forward, backward, up, down, rotateLeft, rotateRight, stop and recover (Send this after a crash when LEDs are red)
Sent as:
```socket.emit(command);```
Change speed:
```socket.emit('speed', speed); //send -1 to go slower, 1 to go faster```

**Recieving data***
Upon recieving 'navdata' event, the socket data will contain a navigation data object.
Upon recieving 'frame' event, the socket data will contain a raw png buffer showing the front camera view. Add 'data:image/png;base64,' at the begining to display it in a browser for example.


License
----
MIT
[SIOSocket]:https://github.com/MegaBits/SIOSocket
[Socket.IO-java]:https://github.com/nkzawa/socket.io-client.java
[Felixge]:https://github.com/felixge
[ThreeJS]:http://threejs.org/
[node.js]:http://nodejs.org
[jQuery]:http://jquery.com
[SocketIO]:http://socket.io/
[Node-Ar-Drone]:https://github.com/felixge/node-ar-drone
