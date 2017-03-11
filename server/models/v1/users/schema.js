"use strict";

module.exports = function(sequelize, DataTypes){
    return {
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.DATE,
            field: 'birthday'
        },
        refreshToken: {
            type: DataTypes.INTEGER,
            field: 'refresh_token'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }
};