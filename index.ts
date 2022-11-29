import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);



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