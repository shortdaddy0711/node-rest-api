import { MongoClient } from 'mongodb';
import { config } from '../config.js';

const { host } = config.db;

// Connection URL
const url = host;
const client = new MongoClient(url);

export async function connectDB() {
	return await client.connect();
}

export function getDb(dbName) {
	return client.db(dbName);
}
