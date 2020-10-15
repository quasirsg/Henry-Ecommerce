const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cartUser", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
  });
};
