import dotenv from 'dotenv';
dotenv.config();

const checkEnvVar = (key, defaultValue = undefined) => {
	const value = process.env[key] || defaultValue;
	if (!value) {
		try {
			throw new Error(`undefined env variable: ${key}`);
		} catch (error) {
			console.error(error.name, ': ', error.message);
		}
	}
	return value;
};

export const config = {
	jwt: {
		secretKey: checkEnvVar('JWT_SECRET'),
		expiresInSec: checkEnvVar('JWT_EXPIRATION', '1d'),
	},
	bcrypt: {
		saltRounds: +checkEnvVar('BCRYPT_SALT_ROUNT', 10),
	},
	port: +checkEnvVar('PORT', '8080'),
	db: {
		host: checkEnvVar('DB_HOST'),
		user: checkEnvVar('DB_USER'),
		database: checkEnvVar('DB_DATABASE'),
		password: checkEnvVar('DB_PASSWORD'),
	},
	cors: {
		allowedOrigin: checkEnvVar('CORS_ALLOW_ORIGIN'),
	},
};
