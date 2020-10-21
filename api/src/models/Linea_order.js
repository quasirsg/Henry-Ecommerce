const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("linea_order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
};
