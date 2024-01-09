import db from "../models/index"

let createNewClinic = (data) => {
    console.log('hoang check reqest: ', data.name)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown || !data.avatar) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.avatar,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    Message: 'Create Clinic successed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                attributes: {
                    exclude: ['descriptionMarkdown', 'descriptionHTML']
                }
            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                })
            } else {
                data = {};
            }
            resolve({
                errCode: 0,
                Message: 'Data from server!',
                data: data
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorWithClinic = (inputId) => {
    //console.log('hoang check id: ', inputId)
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = {};
                data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['address', 'descriptionMarkdown', 'descriptionHTML', 'name'],
                    include: [
                        {
                            model: db.Doctor_infor,
                            where: {
                                clinicID: inputId,

                            },
                            as: 'clinicData', attributes: ['doctorID'],

                        }      //  { model: db.Allcode, as: 'provinceData', attributes: ['valueVi', 'valueEn'] },
                    ],
                    raw: false,
                    nest: true
                })
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
    createNewClinic, getAllClinic,
    getAllDoctorWithClinic
}