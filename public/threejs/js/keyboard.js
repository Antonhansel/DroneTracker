function initKeyboard(){
	var commands = [[83 , 'backward'], 
					[90 , 'forward'],
					[68 , 'rotateLeft'],
					[81 , 'rotateRight'],
					[38 , 'up'],
					[40 , 'down'],
					[65 , 'land'],
					[69 , 'takeoff']];


	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

	keyboard.domElement.addEventListener('keyup', function(event){
		socket.emit('stop');
	})

	keyboard.domElement.addEventListener('keydown', function(event){
		if (!event.repeat){
			console.log('EVENT');
			for (var i = 0; i < commands.length; i++){
				if (commands[i][0] == event.which){
					socket.emit(commands[i][1]);
				}
			}
		}
	})
}