import express, { Router } from "express";
//import homecontroller from "../controllers/homecontroller";
import usercontroller from "../controllers/usercontroller";
import doctorcontroller from "../controllers/doctorcontroller";
import patientcontroller from '../controllers/patientcotroller'
let router = express.Router();
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


    router.get('/api/top-doctor-home', doctorcontroller.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorcontroller.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorcontroller.postInforDoctors)
    router.get('/api/get-infor-doctors-by-id', doctorcontroller.getInforDoctorsById)
    router.get('/api/get-schedule-doctor-by-date', doctorcontroller.getScheduleDoctorByDate)
    router.post('/api/bulk-create-schedule', doctorcontroller.bulkCreateShedule)
    router.get('/api/get-extra-doctor-infor-by-id',doctorcontroller.getExtraDoctorInforById)
    router.get('/api/get-profile-doctor-infor-by-id',doctorcontroller.getFrofileDoctorInforById)

    router.post('/api/patient-booking-infor',patientcontroller.postPatientBookingInfor)
    router.post('/api/confirm-patient-booking-infor',patientcontroller.postConfirmPatientBookingInfor)
   
    return app.use("/", router);
}

module.exports = initWebRouters;