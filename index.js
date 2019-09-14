var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 3030;

//App setup
var app =express();
var server = app.listen(PORT,function(){
	console.log('Server started:'+PORT);
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection',function(socket){
	console.log('Made socket connection',socket.id);

	//Handle Chat Event
	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	});

	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});
});