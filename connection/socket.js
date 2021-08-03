import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

const Socket = (server) => {
	this.io = new Server(server, {
		cors: {
			origin: 'http://localhost:3000',
		},
	});

	this.io.use((socket, next) => {
		const token = socket.handshake.auth.token;
		if (!token) return new Error('No auth info');
		jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
			if (error) return new Error('authentication error');
		});
		next();
	});

	this.io.on('connection', (socket) => {
		console.log('connected');
	});
};

let socket;
export const initSocket = (server) => {
	socket = new Socket(server);
};

export const getSocketIo = () => {
    if (!socket) throw new Error('Please get socket initialized');
	return socket.io;
};
