'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.Allcode, { foreignKey: 'mepType', targetKey: 'keyMap', as: 'mepData' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'statusID', targetKey: 'keyMap', as: 'statusData' })

            Booking.belongsTo(models.User, { foreignKey: 'doctorID', targetKey: 'id', as: 'doctorData' })
            Booking.belongsTo(models.User, { foreignKey: 'patientID', targetKey: 'id', as: 'patientData' })



        }
    };
    Booking.init({
        statusID: DataTypes.STRING,
        doctorID: DataTypes.INTEGER,
        patientID: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        mepType: DataTypes.STRING,
        userConfirm:DataTypes.STRING

    }, {

        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};