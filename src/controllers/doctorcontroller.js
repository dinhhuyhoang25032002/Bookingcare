import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    // console.log('hoang check data: ', req.user);
    let limit = req.query.limit;
    if (!limit) limit = 15;
    try {
        let response = await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }

}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorsService();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the serverr'
        })
    }
}

let postInforDoctors = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctorsService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getInforDoctorsById = async (req, res) => {
    try {
        let infor = await doctorService.getInforDoctorsByIdService(req.query.id)
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let bulkCreateShedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateShedule(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let schedule = await doctorService.getScheduleDoctorByDate(req.query.doctorID, req.query.date)
        return res.status(200).json(schedule)


    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getExtraDoctorInforById = async (req, res) => {
    try {
        let extraDoctorInfor = await doctorService.getExtraDoctorInforById(req.query.doctorID)
        return res.status(200).json(extraDoctorInfor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}

let getFrofileDoctorInforById = async (req, res) => {
    try {
        let data = await doctorService.getFrofileDoctorInforById(req.query.doctorID)
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllPatientByDoctorId = async (req, res) => {
    try {
        let data = await doctorService.getAllPatientByDoctorId(req.query.doctorID, req.query.date)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}

let postMedicineBill = async (req, res) => {
    try {
        let data = await doctorService.postMedicineBill(req.body)
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from server !'
        })
    }
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctors: postInforDoctors,
    getInforDoctorsById: getInforDoctorsById,
    bulkCreateShedule: bulkCreateShedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraDoctorInforById: getExtraDoctorInforById,
    getFrofileDoctorInforById: getFrofileDoctorInforById,
    getAllPatientByDoctorId, postMedicineBill
}