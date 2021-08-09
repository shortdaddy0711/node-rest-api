import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
class Tweet extends Model {}

Tweet.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		// timestamps: true,
		// createdAt: true,
		// updatedAt: false,
		modelName: 'tweet',
	}
);
Tweet.belongsTo(User);

const attributes = [
	'id',
	'text',
	'createdAt',
	'userId',
	[Sequelize.col('user.name'), 'name'],
	[Sequelize.col('user.username'), 'username'],
	[Sequelize.col('user.url'), 'url'],
];
const include = {
	model: User,
	attributes: [],
};
const order = [['createdAt', 'DESC']];

export default {
	async getAll() {
		return await Tweet.findAll({
			attributes,
			include,
			order,
		})
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async getByUsername(username) {
		return await Tweet.findAll({
			attributes,
			include: { ...include, where: { username } },
			order,
		})
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async getById(id) {
		return await Tweet.findByPk(id, {
			attributes,
			include,
		})
			.then((data) => data)
			.catch((e) => console.log(e));
	},

	async addTweet(text, userId) {
		return await Tweet.create({ text, userId })
			.then(({ id }) => {
				return this.getById(id);
			})
			.catch((e) => console.log(e));
	},

	async updateTweet(text, id) {
		return await Tweet.update({ text }, { where: { id } })
			.then(() => {
				return this.getById(id);
			})
			.catch((e) => console.log(e));
	},

	async deleteTweet(id) {
		return await Tweet.destroy({ where: { id } })
			.then((data) => data)
			.catch((e) => console.log(e));
	},
};
