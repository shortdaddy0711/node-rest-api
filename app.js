import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on('connection', (socket) => {
	console.log('connect');

	// or with emit() and custom event names
	socket.emit('hola', 'Hey!', { ms: 'jane' }, Buffer.from([4, 3, 3, 1]));

	// handle the event sent with socket.send()
	socket.on('message', (data) => {
		console.log(data);
	});

	// handle the event sent with socket.emit()
	socket.on('salutations', (elem1, elem2, elem3) => {
		console.log(elem1, elem2, elem3);
	});
});

app.set('port', config.host.port || 8080);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/tweets', tweetsRoute);
app.use('/api/auth', authRoute);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((err, req, res, next) => {
	console.error(err);
	res.sendStatus(500);
});

httpServer.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
