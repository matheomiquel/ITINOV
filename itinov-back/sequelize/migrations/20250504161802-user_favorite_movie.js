'use strict';
const baseSchema = require("../base-schema")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_favorite_movie', {
      ...baseSchema,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      movie_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "movie",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
    });
  },
};
