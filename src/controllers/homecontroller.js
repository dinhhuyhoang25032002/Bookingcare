import { json } from 'body-parser';
import db from '../config/index';
import CRUDservice from '../services/CRUDservice';




let getCRUD = (req, res) => {
    return res.render('CRUD.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();

    return res.render('displayCRUD.ejs', {
        datatable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDservice.getUserInforById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        });

    } else {
        return res.send('404: not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        datatable: allUsers
    })

}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete user success!')
    } else {
        return res.send('User not found!');
    }
}


module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}