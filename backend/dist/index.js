"use strict";
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
});
io.on('connection', function (socket) {
    socket.emit('me', socket.id);
    socket.on('disconnect', function () {
        socket.broadcast.emit('callEnded');
    });
    socket.on('callUser', function (data) {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
    });
    socket.on('answerCall', function (data) { return io.to(data.to).emit('callAccepted', data.signal); });
});
server.listen(5000, function () { return console.log('server listening on port 5000'); });
//# sourceMappingURL=index.js.map