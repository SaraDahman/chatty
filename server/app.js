const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const routes = require('./routes');
const { GenerateError } = require('./helpers');
const socketHandlers = require('./socket')

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

let onlineUsers = []


require('dotenv').config();
app.use([express.json(), cors()]);

app.use('/api', routes)

app.use((req, res, next) => {
    const error = new GenerateError(404, 'Not Found');
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const onConnection = (socket) => {
    console.log('socket connected', socket.id);
    socketHandlers.onlineUsersHandler(io, socket, onlineUsers)
    socketHandlers.messagesHandler(io, socket, onlineUsers)
}

io.on('connection', onConnection);

module.exports = server;