'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {
        //create users table
        queryInterface.createTable('users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: true

                },
                role: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                birthday: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                refresh_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updated_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            },
            {
                engine: 'InnoDB', // default: 'InnoDB'
                charset: 'utf8' // default: null
            }).then(function () {
                //add index
                queryInterface.addIndex(
                    'users',
                    ['email'],
                    {
                        indexName: 'idxUserEmail',
                        indicesType: 'UNIQUE'
                    }
                );

                done();
        });
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('users');
    }
};
