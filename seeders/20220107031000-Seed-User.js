"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let data = require("../datas/users.json");
		data.forEach((el) => {
			delete el.id;
			el.createdAt = new Date();
			el.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Users", data, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
