import axios from '../axios'
const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login',
        {
            email: userEmail,
            password: userPassword
        });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserFromService = (data) => {

    return axios.post('/api/create-new-user', data);
}


const deleteUserFromService = (userID) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userID
        }
    });
}

const editUserFromService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveInforDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

const getInforDoctorService = (inputId) => {
    return axios.get(`/api/get-infor-doctors-by-id?id=${inputId}`)
}

const saveScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctor = (doctorID, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`)

}
const getExtraDoctorInfor = (doctorID) => {
    return axios.get(`/api/get-extra-doctor-infor-by-id?doctorID=${doctorID}`)

}

let getProfileDoctorById = (doctorID) => {
    return axios.get(`/api/get-profile-doctor-infor-by-id?doctorID=${doctorID}`)
}
let postPatientBookingInfor = (data) => {
    return axios.post('/api/patient-booking-infor', data)
}

let postConfirmPatientBookingInfor = (data) => {
    return axios.post('/api/confirm-patient-booking-infor', data)
}

export {
    handleLogin, getAllUsers,
    createNewUserFromService, deleteUserFromService,
    editUserFromService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctorsService,
    saveInforDoctorService, getInforDoctorService,
    saveScheduleDoctor, getScheduleDoctor,
    getExtraDoctorInfor, getProfileDoctorById,
    postPatientBookingInfor, postConfirmPatientBookingInfor,
}