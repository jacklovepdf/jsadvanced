const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080/');
const sendMsg = [
    "message1",
    "message2",
    "message3",
    "message4",
    "message5"
]
// setTimeout(function () {
//
//     }, 200);

ws.on('open', function open() {
    console.log("open");
    sendMsg.forEach(function (item) {
        ws.send(item);
    });
});

