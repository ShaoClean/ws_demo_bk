const express = require('express');
const {createServer} = require('node:http');

const app = express();
const server = createServer(app);

const {Server} = require('socket.io');


const io = new Server(server, {cors:true});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // 监听客户端发送的消息
    socket.on('chat message', (msg) => {
        console.log(`Message: ${msg}`);

        // 将消息广播给所有客户端
        io.emit('chat message', msg);
    });

    // 监听连接断开事件
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
