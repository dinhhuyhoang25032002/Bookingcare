import specialtyService from '../services/specialtyService'

let createNewSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from server!'
        })

    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialty();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from server!'
        })

    }
}

let getAllDoctorWithSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllDoctorWithSpecialty(req.query.id, req.query.location)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({

            errCode: -1,
            errMesage: 'Error from server!'
        })
    }
}

module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getAllDoctorWithSpecialty: getAllDoctorWithSpecialty,
}