'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            }
        });

        await queryInterface.createTable('channel', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                },
                underscored: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            }
        });

        await queryInterface.createTable('video', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            channel_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'channel',
                    key: 'id'
                },
                underscored: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                underscored: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropAllTables();
    }
};