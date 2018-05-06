const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080/');
const sendMsg = [
    "message1",
    "message2",
    "message3",
    "message4",
    "message5"
]
ws.on('open', function open() {
    sendMsg.forEach(function (item) {
        ws.send(item);
    });
});
