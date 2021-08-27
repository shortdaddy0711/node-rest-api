import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';
import { csrfCheckMiddleware } from './middleware/csrf.js';
import { rateLimiter } from './middleware/rate-limiter.js';

const app = express();

const corsOptions = {
	origin: config.cors.allowedOrigin,
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(rateLimiter);

app.use(csrfCheckMiddleware);
app.use('/api/tweets', tweetsRoute);
app.use('/api/auth', authRoute);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
});

sequelize.sync().then(() => {
	console.log('mysql db connected...');
	const server = app.listen(config.port, () => {
		console.log('Express server listening on port ' + config.port);
	});
	initSocket(server);
});
