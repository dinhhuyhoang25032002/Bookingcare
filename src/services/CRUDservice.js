import bcrypt from 'bcrypt';
import db from '../config/index';
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordfrombcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                passWord: hashPasswordfrombcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleid,

            })
            resolve();
        } catch (e) {
            reject(e);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll()
            raw: true,
                resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInforById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
                //raw: true

            })

            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;
                user.phoneNumber = data.phonenumber;

                await user.save();
                let allUsers = db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

};