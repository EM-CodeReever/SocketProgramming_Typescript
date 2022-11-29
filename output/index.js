"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});
// app.listen(3000, () => {
//     console.log('Listening on port 3000');
//     });
io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg, socket.id);
        console.log('message: ' + msg);
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
