const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('reviews', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
}