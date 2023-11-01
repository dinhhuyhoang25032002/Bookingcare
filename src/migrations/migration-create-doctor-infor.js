'use strict';

const sequelize = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorID: {
                allowNull: false,
                type: Sequelize.INTEGER
            },

            provinceID: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentID: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nameClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },
            priceID: {
                allowNull: false,
                type: Sequelize.STRING
            },
            addressClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },

            note: {
                type: Sequelize.STRING
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_infor');
    }
};