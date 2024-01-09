import db from "../models/index"
require('dotenv').config();
import _ from 'lodash'
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE
let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleID: 'R2' },
                order: [["id"]], //DESC
                attributes: {
                    exclude: ['passWord']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_infor,
                        include: [
                            { model: db.Specialty, as: 'specialtyData', attributes: ['name'] }
                        ]
                    }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleID: 'R2' },
                attributes: {
                    exclude: ['passWord', 'image']
                },

            })
            resolve({
                errCode: 0,
                data: doctors,
            })
        } catch (e) {
            reject(e);
        }
    })
}


let checkValidRequired = (inputData) => {
    let arrCheckValid = ['doctorID', 'contentHTML', 'contentMarkdown', 'action'
        , 'selectedProvince', 'selectedPrice', 'selectedPayment', 'nameClinic', 'addressClinic', 'selectedSpecialty', 'selectedClinic'];
    let valueChecked = true;
    let element = '';
    for (let i = 0; i < arrCheckValid.length; i++) {
        if (!inputData[arrCheckValid[i]]) {
            valueChecked = false
            element = arrCheckValid[i]
            break;
        }
    }
    return ({
        valueChecked: valueChecked,
        element: element
    })
}

let saveInforDoctorsService = (inputData) => {

    return new Promise(async (resolve, reject) => {

        try {
            let isCheck = checkValidRequired(inputData)
            if (isCheck.valueChecked === false) {
                resolve({
                    errCode: -1,
                    errMessage: `Missing parameter input: ${isCheck.element}`
                })
            } else {
                //update and create markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorID: inputData.doctorID,
                        specialtyID: inputData.selectedSpecialty,
                        clinicID: inputData.selectedClinic

                    })



                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorID: inputData.doctorID },
                        raw: false
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.specialtyID = inputData.selectedSpecialty
                        doctorMarkdown.clinicID = inputData.selectedClinic
                    } await doctorMarkdown.save()
                }

                // update and create doctor infor

                let doctorInfor = await db.Doctor_infor.findOne({
                    where: { doctorID: inputData.doctorID },
                    raw: false
                })

                if (doctorInfor) {
                    doctorInfor.doctorID = inputData.doctorID,
                        doctorInfor.provinceID = inputData.selectedProvince,
                        doctorInfor.paymentID = inputData.selectedPayment,
                        doctorInfor.priceID = inputData.selectedPrice,
                        doctorInfor.nameClinic = inputData.nameClinic,
                        doctorInfor.addressClinic = inputData.addressClinic,
                        doctorInfor.note = inputData.note,
                        doctorInfor.specialtyID = inputData.selectedSpecialty,
                        doctorInfor.clinicID = inputData.selectedClinic

                    await doctorInfor.save();
                } else {

                    await db.Doctor_infor.create({
                        doctorID: inputData.doctorID,
                        provinceID: inputData.selectedProvince,
                        paymentID: inputData.selectedPayment,
                        priceID: inputData.selectedPrice,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyID: inputData.selectedSpecialty,
                        clinicID: inputData.selectedClinic
                    })
                }
                resolve({
                    errCode: 0,
                    Message: 'Save infor doctor successed'
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}

let getInforDoctorsByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['passWord']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorID', 'createdAt', 'updatedAt']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Specialty, as: 'specialtyData', attributes: ['name'] }
                            ]
                        }

                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateShedule = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = inputData.arrSchedule;
            if (!schedule || !inputData.doctorID || !inputData.formatDate) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;

                    })
                }
                // get data from db
                let existing = await db.Schedule.findAll({
                    where: { doctorID: inputData.doctorID, date: inputData.formatDate },
                    attributes: ['timeType', 'date', 'doctorID', 'maxNumber'],
                    raw: true
                })


                // compare data request vs data server
                let toCreate = _.differenceWith(schedule, existing, (schedule, existing) => {
                    return schedule.timeType === existing.timeType && +schedule.date === +schedule.date;
                })
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                //    console.log('chech data reuest vs data server: ', toCreate)
                resolve({
                    errCode: 0,
                    Message: `Create doctor's Schedule successed! `
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getScheduleDoctorByDate = (doctorID, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorID || !date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorID: doctorID,
                        date: date
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'timeTypeData',
                            attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.User, as: 'doctorProfile', attributes: ['firstName', 'lastName']
                        }
                    ],
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    raw: false,
                    nest: true
                })
                //  console.log ('check data',dataSchedule)
                if (!dataSchedule)
                    dataSchedule = []

                resolve({
                    errCode: 0,
                    Message: 'Data from server!',
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getExtraDoctorInforById = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Doctor_infor.findOne({
                    where: { doctorID: inputID },
                    attributes: {
                        exclude: ['id', 'doctorID', 'createdAt', 'updatedAt']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    Message: 'Data from server!',
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getFrofileDoctorInforById = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputData
                    },
                    attributes: {
                        exclude: ['id', 'email', 'phoneNumber', 'address', 'passWord']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                        {
                            model: db.Doctor_infor,
                            attributes: { exclude: ['id'] },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueVi', 'valueEn'] }
                            ]
                        }
                    ],
                    raw: false,
                    nest: true

                })
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                } else if (!data) data = {};

                resolve({
                    errCode: 0,
                    Message: "Data from server",
                    data: data,
                })
            }


        } catch (e) {
            reject(e);

        }
    })
}

module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctorsService: getAllDoctorsService,
    saveInforDoctorsService: saveInforDoctorsService,
    getInforDoctorsByIdService: getInforDoctorsByIdService,
    bulkCreateShedule: bulkCreateShedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraDoctorInforById: getExtraDoctorInforById,
    getFrofileDoctorInforById: getFrofileDoctorInforById,
}