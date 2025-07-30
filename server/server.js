import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import socketHandler from './socket/socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);




const io = new SocketIO(server, {
  cors: { origin: 'http://localhost:3000' },
});




connectDB();
app.use(cors());
app.use(express.json());

// Inject io into every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/students', studentRoutes);
io.on('connection', socket => socketHandler(socket, io));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));