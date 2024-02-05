import { reject } from "lodash";
import db from "../models/index"
require('dotenv').config();
import _ from 'lodash'
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';

let patientCofirmURL = (doctorID, token) => {
    let result = `${process.env.URL_REACT}/confirm-schedule?token=${token}&doctorID=${doctorID}`;
    return result;
}

let postPatientBookingInfor = (dataInput) => {
    return new Promise(async (resolve, reject) => {

       // console.log('check dataInput: ', dataInput)
        let dateOfBirth = "" + dataInput.dateOfBirth
        try {
            if (!dataInput.email || !dataInput.doctorID ||
                !dataInput.dateOfBirth || !dataInput.timeType ||
                !dataInput.bookingMethod || !dataInput.fullNamePatient ||
                !dataInput.address || !dataInput.gender ||
                !dataInput.bookingMethod || !dataInput.dateBooking) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let token = uuidv4();
                await emailService.checkActivityEmail(
                    {
                        email: dataInput.email,
                        patientName: dataInput.fullNamePatient,
                        doctorName: dataInput.doctorName,
                        language: dataInput.language,
                        dataTime: dataInput.dataTime,
                        link: patientCofirmURL(dataInput.doctorID, token),
                    }
                )

                let user = await db.User.findOrCreate({
                    where: { email: dataInput.email },
                    defaults: {
                        email: dataInput.email,
                        firstName: dataInput.fullNamePatient,
                        phoneNumber: dataInput.phoneNumber,
                        roleID: 'R3',
                        address: dataInput.address,
                        gender: dataInput.gender
                    }
                });
              //  console.log('user in my server: ', user[0])
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientID: user[0].id },
                        defaults: {
                            statusID: 'S1',
                            doctorID: dataInput.doctorID,
                            date: dataInput.dateBooking,
                            timeType: dataInput.timeType,
                            mepType: dataInput.bookingMethod,
                            userConfirm: token,
                            //  userConfirm
                        }

                    })
                }
                //xif (user[0].id)
                resolve({
                    errCode: 0,
                    Message: "You have successfully created an account for booking appointments.",
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let postConfirmPatientBookingInfor = (data) => {
    // console.log('check data.tocken', data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorID && !data.token) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let confirmBooking = await db.Booking.findOne({
                    where: {
                        doctorID: data.doctorID,
                        userConfirm: data.token,
                        statusID: 'S1',
                    },
                    raw: false,
                    //  nest: true,
                })
                if (confirmBooking) {
                    confirmBooking.statusID = 'S2';
                    await confirmBooking.save();

                    resolve({
                        errCode: 0,
                        Message: "Confirm Patient's Booking successed!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'The appointment has been approved or does not exist!'
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    postPatientBookingInfor: postPatientBookingInfor,
    postConfirmPatientBookingInfor: postConfirmPatientBookingInfor,
}