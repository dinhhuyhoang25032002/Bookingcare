'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // contentHTML:DataTypes.TEXT('long'),
            // contentMarkdown:DataTypes.TEXT('long'),
            // description:DataTypes.TEXT('long'),
            // doctorID:DataTypes.INTEGER,
            // specialtyID:DataTypes.INTEGER,
            // clinicID:DataTypes.INTEGER,
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            doctorID: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            specialtyID: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clinicID: {
                allowNull: true,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('markdowns');
    }
};