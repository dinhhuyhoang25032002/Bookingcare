import { promiseImpl } from "ejs";
import db from "../models/index"
import bcrypt from 'bcrypt';
//mport { createJWT, verifyToken } from '../middleware/jwtAction'
import dotenv from 'dotenv'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleID', 'passWord', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                    //   exclude:['passWord']
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.passWord)
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = 'Login successed',

                            delete user.passWord,
                            userData.user = user;
                    } else {
                        userData.errCode = 3,
                            userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2,
                        userData.errMessage = `User's data not found`
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`
            }

         //   let jwt = createJWT(userData.user);
            userData.Token = jwt;
            userData.ExpireIn = process.env.EXPIRE_IN;
           
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    console.log('data:', data)
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email already exists. Please try another'
                })
            } else {

                let hashPasswordfrombcrypt = await hashUserPassword(data.passWord);

                await db.User.create({
                    email: data.email,
                    passWord: hashPasswordfrombcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleID: data.roleID,
                    positionID: data.positionID,
                    image: data.avatar

                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}


let hashUserPassword = (password) => {
    console.log('check', password)
    return new Promise(async (resolve, reject) => {
        try {
            if (!password) {
                reject(new Error('Password is required'));
                return;
            }
            const salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist!`
            })
        } else {
            await db.User.destroy({
                where: { id: userId }
            });

            resolve({
                errCode: 0,
                message: 'The user was deleted!'
            })
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log('check data12', data)
        try {
            if (!data.id || !data.roleID || !data.positionID || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    user.phoneNumber = data.phoneNumber,
                    user.positionID = data.positionID,
                    user.roleID = data.roleID,
                    user.gender = data.gender;

                if (data.avatar) {
                    user.image = data.avatar
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update User a successfully'

                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User Not found'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requered parameter'
                })

            } else {
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                resolve({
                    errCode: 0,
                    data: allcode,
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}