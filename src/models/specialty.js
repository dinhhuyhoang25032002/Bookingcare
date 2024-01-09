'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Specialty.hasOne(models.Doctor_infor, { foreignKey: 'specialtyID', as: 'specialtyData' })
           // Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
        }
    };
    Specialty.init({
        //id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        image: DataTypes.TEXT,

    }, {

        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};