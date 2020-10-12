const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("linea_order", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
};
