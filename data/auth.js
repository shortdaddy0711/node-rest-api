import pkg from 'sequelize';
import { sequelize } from '../db/database.js';
const { Sequelize, Model, DataTypes } = pkg;

export class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		url: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'user',
	}
);

export default {
	async findByUsername(username) {
		return User.findOne({ where: { username } })
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async getAllUsers() {
		return User.findAll()
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async findById(id) {
		return User.findByPk(id)
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async addUser(user) {
		return User.create(user)
			.then((data) => data)
			.catch((e) => console.log(e));
	},
};
