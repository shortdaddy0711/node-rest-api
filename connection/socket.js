import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
	constructor(server) {
		this.io = new Server(server, {
			cors: {
				origin: '*',
			},
		});

		this.io.use((socket, next) => {
			const token = socket.handshake.auth.token;
			if (!token) return next(new Error('No auth info'));
			jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
				if (error) return next(new Error('authentication error'));
			});
			next();
		});

		this.io.on('connection', (socket) => {
			console.log(socket.id, 'connected');
		});
	}
}

let socket;
export const initSocket = (server) => {
	if (!socket) socket = new Socket(server);
};

export const getSocketIo = () => {
	if (!socket) throw new Error('Please get socket initialized');
	return socket.io;
};
