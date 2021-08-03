import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { createServer } from 'http';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js';
import { config } from './config.js';
import initSocket from './connection/socket.js';

const app = express();
const httpServer = createServer(app);

app.set('port', config.host.port || 8080);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/tweets', tweetsRoute);
app.use('/api/auth', authRoute);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}

httpServer.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

initSocket(httpServer);
