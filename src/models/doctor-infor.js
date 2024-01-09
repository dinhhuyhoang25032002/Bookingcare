'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_infor.belongsTo(models.User, { foreignKey: 'doctorID' });

            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceID', targetKey: 'keyMap', as: 'provinceData' });
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceID', targetKey: 'keyMap', as: 'priceData' });
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentID', targetKey: 'keyMap', as: 'paymentData' });

            Doctor_infor.belongsTo(models.Specialty,{foreignKey:'specialtyID',targetKey:'id',as:'specialtyData'});

            Doctor_infor.belongsTo(models.Clinic,{foreignKey:'clinicID',targetKey:'id',as:'clinicData'})

        }
    };

    // provinceId
    // paymentId
    // addressClinic
    // nameClinic
    // note
    // count
    Doctor_infor.init({
        doctorID: DataTypes.INTEGER,
        specialtyID: DataTypes.INTEGER,  
        clinicID: DataTypes.INTEGER,

        priceID: DataTypes.STRING,
        provinceID: DataTypes.STRING,
        paymentID: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {

        sequelize,
        modelName: 'Doctor_infor',
        freezeTableName: true
    });
    return Doctor_infor;
};