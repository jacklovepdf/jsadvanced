const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8880 });

wss.on('connection', function connection(ws, request) {
    ws.on('message', function incoming(message) {
        if(typeof message === 'string'){
            console.log('received: %s', message);
        }else{
            console.log('received buffer: %s', message.toString('utf8'), message.length);
            message.forEach(function(item){
                console.log('item===>', item);
            })
        }
        for(let i=0; i< 3; i++){
            console.log('i========>', i);
            ws.send('i am from websocket server' + i);
        }
    });
    const array = new Int16Array(5);
    for (var i = 0; i < array.length; ++i) {
        array[i] = i;
    }
    console.log('ws.sendws.send')
    ws.send(array);
});