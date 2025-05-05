const Sequelize = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    allowNull: false,
    type:  Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    allowNull: false,
    type:  Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}