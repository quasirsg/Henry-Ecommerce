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
            validate: {
                min: 1,
                max: 5
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [20, 180]
                }
            }
        }
    });
}