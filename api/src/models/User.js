const {DataTypes}= require("sequelize");

module.exports=(sequelize)=>{

    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
        },
        location_id:{
            type: DataTypes.INTEGER,
        },
        rol:{
            type: DataTypes.BOOLEAN,
            defaultValue: 'Client',
            allowNull: false
        },
    });

};