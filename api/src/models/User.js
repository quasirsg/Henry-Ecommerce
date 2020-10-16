const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      noUpdate: true

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,

    },
    location_id: {
      type: DataTypes.INTEGER,
    },
    
    rol: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      noUpdate:true
    },

  });
};
