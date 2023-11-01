'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinc_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctor_Clinc_Specialty.init({
    doctorID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER,
    specialtyID: DataTypes.STRING
    
  }, {

    sequelize,
    modelName: 'Doctor_Clinc_Specialty',
  });
  return Doctor_Clinc_Specialty;
};