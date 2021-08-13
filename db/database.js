import mongoose from 'mongoose';
import { config } from '../config.js';

mongoose.connect(`${config.db.host}${config.db.database}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

// Connection URL
export function connectDB() {
	return mongoose.connection;
}

export function idVirtualization(schema) {
	schema.virtual('id').get(function () {
		return this._id.toString();
	});
	schema.set('toJSON', { virtuals: true });
	schema.set('toObject', { virtuals: true });
}
