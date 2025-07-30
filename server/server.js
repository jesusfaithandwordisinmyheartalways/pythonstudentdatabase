import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import socketHandler from './socket/socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

connectDB();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => { req.io = io; next(); });

app.use('/api/students', studentRoutes);

app.get('/', (req, res) => res.send('Server is live ✅'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// ← Updated wildcard route:
app.all('/*splat', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), err => {
    if (err) res.status(500).send('Index file not found.');
  });
});

io.on('connection', socket => socketHandler(socket, io));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`🚀 Server  on port ${PORT}`));