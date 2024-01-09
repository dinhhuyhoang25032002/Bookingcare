'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionID', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })

      User.hasOne(models.Markdown, { foreignKey: 'doctorID' })
     
      User.hasOne(models.Doctor_infor, { foreignKey: 'doctorID' })

      User.hasOne(models.Booking, { foreignKey: 'doctorID', as: 'doctorData' })
      User.hasOne(models.Booking, { foreignKey: 'patientID', as: 'patientData' })

      User.hasMany(models.Schedule, { foreignKey: 'doctorID', as:'doctorProfile' })
    }
  };
  User.init({
    //id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    passWord: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleID: DataTypes.STRING,
    positionID: DataTypes.STRING
  }, {

    sequelize,
    modelName: 'User',
  });
  return User;
};