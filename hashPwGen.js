import bcrypt from 'bcrypt';

const saltRound = 10;
const hashPassword = (password, salt) => {
	return bcrypt.hashSync(password, salt);
};

console.log(hashPassword('hopper21', saltRound), Date.now().toString(), new Date().toISOString());
