import patientService from '../services/patientService'

let postPatientBookingInfor = async (req, res) => {
    try {
        let data = await patientService.postPatientBookingInfor(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let postConfirmPatientBookingInfor = async(req, res)=>{
    try {
        let data = await patientService.postConfirmPatientBookingInfor(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:"Error from server!"
        })
        
    }
     
}

module.exports = {
    postPatientBookingInfor: postPatientBookingInfor,
    postConfirmPatientBookingInfor:postConfirmPatientBookingInfor,
}