import { reject } from "lodash"
import db from "../models/index"

let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.avatar || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.avatar,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })


                resolve({
                    errCode: 0,
                    Message: 'Create Specialty successed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                })

            } else if (!data) data = {};

            resolve({
                errCode: 0,
                errMessage: 'Data from server!',
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllDoctorWithSpecialty = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {

                let data = {};
                if (location === "ALL") {
                    data = await db.Specialty.findAll({
                        where: { id: inputId },
                        attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],
                        include: [
                            {
                                model: db.Doctor_infor,
                                where: { specialtyID: inputId },
                                as: 'specialtyData',
                                attributes: ['doctorID', 'provinceID'],

                            }

                        ],
                        raw: false,
                        nest: true
                    })
                } else {
                    data = await db.Specialty.findAll({
                        where: { id: inputId },
                        attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],
                        include: [
                            {
                                model: db.Doctor_infor,
                                where: {
                                    specialtyID: inputId,
                                    provinceID: location
                                },
                                as: 'specialtyData', attributes: ['doctorID', 'provinceID'],

                            }
                            //  { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] },
                        ],
                        raw: false,
                        nest: true
                    })
                }



                if (!data) {
                    data = {}
                }
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

module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getAllDoctorWithSpecialty: getAllDoctorWithSpecialty,
}