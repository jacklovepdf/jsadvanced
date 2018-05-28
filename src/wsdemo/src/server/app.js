const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("connection from client");
    ws.on('message', function incoming(message) {
        console.log("receive message from client");
        console.log('received: %s', message);
    });
    console.log("send message to client");
    ws.send('something');
});