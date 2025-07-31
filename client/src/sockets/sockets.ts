import { io, Socket } from 'socket.io-client';

const URL = 'https://pythonstudentdatabaseserver.onrender.com';

const socket: Socket = io(URL, {
  transports: ['websocket'],
});

export default socket;