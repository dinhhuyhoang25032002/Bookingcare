import express from "express";
//import homecontroller from "../controllers/homecontroller";/api/login
import usercontroller from "../controllers/usercontroller";
import doctorcontroller from "../controllers/doctorcontroller";
import patientcontroller from '../controllers/patientcotroller';
import specialtycontroller from '../controllers/specialtycontroller';
import cliniccontroller from '../controllers/cliniccontroller'
import { checkJwtAndCookieFromClient,checkPermissionUser } from '../middleware/jwtAction'


let router = express.Router();


let checkUserScope = (req, res, next) => {
    let RouterExemptMiddleWare = ['/api/login'];
    if (RouterExemptMiddleWare.includes(req.path)) return next();
}

let initWebRouters = (app) => {

    // router.get('/crud', homecontroller.getCRUD);
    // router.post('/post-crud', homecontroller.postCRUD);
    // router.get('/get-crud', homecontroller.displayCRUD);
    // router.get('/edit-crud', homecontroller.getEditCRUD);
    // router.post('/put-crud', homecontroller.putCRUD);
    // router.get('/delete-crud', homecontroller.deleteCRUD);


    router.post('/api/login', usercontroller.handleLogin);
    router.get('/api/get-all-users', usercontroller.handleGetAllUser);
    router.post('/api/create-new-user', usercontroller.handleCreateNewUser)
    router.put('/api/edit-user', usercontroller.handleEditUser)
    router.delete('/api/delete-user', usercontroller.handleDeleteUser);
    router.get('/api/allcode', usercontroller.getAllCode);

    //, checkJwtAndCookieFromClient
    router.get('/api/top-doctor-home',checkJwtAndCookieFromClient, doctorcontroller.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorcontroller.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorcontroller.postInforDoctors)
    router.get('/api/get-infor-doctors-by-id', doctorcontroller.getInforDoctorsById)
    router.get('/api/get-schedule-doctor-by-date', doctorcontroller.getScheduleDoctorByDate)
    router.post('/api/bulk-create-schedule', doctorcontroller.bulkCreateShedule)
    router.get('/api/get-extra-doctor-infor-by-id', doctorcontroller.getExtraDoctorInforById)
    router.get('/api/get-profile-doctor-infor-by-id', doctorcontroller.getFrofileDoctorInforById)

    router.post('/api/patient-booking-infor', patientcontroller.postPatientBookingInfor)
    router.post('/api/confirm-patient-booking-infor', patientcontroller.postConfirmPatientBookingInfor)

    router.post('/api/create-new-specialty', specialtycontroller.createNewSpecialty)
    router.get('/api/get-all-specialty', specialtycontroller.getAllSpecialty)
    router.get('/api/get-all-doctor-with-specialty-by-id', specialtycontroller.getAllDoctorWithSpecialty)

    router.post('/api/create-new-clinic', cliniccontroller.createNewClinic)
    router.get('/api/get-all-clinic', cliniccontroller.getAllClinic)
    router.get('/api/get-all-doctor-with-clinic-by-id', cliniccontroller.getAllDoctorWithClinic)

    return app.use("/", router);
}

module.exports = initWebRouters;