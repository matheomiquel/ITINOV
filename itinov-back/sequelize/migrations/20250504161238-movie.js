'use strict';
const baseSchema = require("../base-schema")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movie', {
      ...baseSchema,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      release_date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      cumul_grade: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      grade: {
        allowNull: false,
        type: Sequelize.FLOAT(5, 4),
        defaultValue: 0
      }
    });
  },
};
