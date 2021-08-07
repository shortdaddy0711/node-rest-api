import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { db } from './db/database.js';

const app = express();

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

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
});

db.getConnection().then(() => console.log('mysql db connected!'));

const server = app.listen(config.host.port, () => {
	console.log('Express server listening on port ' + config.host.port);
});

initSocket(server);
