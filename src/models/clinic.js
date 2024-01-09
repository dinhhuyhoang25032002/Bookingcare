'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.hasMany(models.Doctor_infor, { foreignKey: 'clinicID', as: 'clinicData' })

    }
  };
  Clinic.init({
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT('long'),
    descriptionMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.STRING

  }, {

    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};