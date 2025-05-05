'use strict';
const baseSchema = require("../base-schema")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      ...baseSchema,
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
};
