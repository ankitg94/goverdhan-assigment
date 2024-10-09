const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', require('./route/auth'));
app.use('/api/v1/users', require('./route/user'));
app.use('/api/v1/messages', require('./route/message'));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
  }
});
let connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on('identify', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} is connected with socket ID ${socket.id}`);
  });
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    for (let userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  next();
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
