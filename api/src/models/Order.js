const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  //Definir Modelo

  sequelize.define("order", {
    order_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    order_state: {
      type: DataTypes.BOOLEAN,
      allorNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allorNull: false,
    },
  });
};
