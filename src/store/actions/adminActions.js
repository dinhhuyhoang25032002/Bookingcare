import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserFromService, 
    saveInforDoctorService, getAllUsers, deleteUserFromService, 
    editUserFromService, getTopDoctorHomeService, getAllDoctorsService, 
    getAllSpecialty, getAllClinic } from '../../services/userService'
    
import { toast } from 'react-toastify';

//  export const fetchTypeDataStart = () => ({
//      type: actionTypes.FETCH_TYPE_DATA_START
// })


// GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let response = await getAllCodeService("GENDER")
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSucces(response.data));

            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchTypeDataStart error', e)
        }
    }

}

export const fetchGenderSucces = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//POSITION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let response = await getAllCodeService("POSITION")
            if (response && response.errCode === 0) {
                dispatch(fetchPositionSucces(response.data));
                //console.log('check data', response.data)
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }
}
export const fetchPositionSucces = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//ROLE

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let response = await getAllCodeService("ROLE")
            if (response && response.errCode === 0) {
                dispatch(fetchRoleSucces(response.data));
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
}
export const fetchRoleSucces = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let response = await createNewUserFromService(data)
            console.log('check response :', response)
            if (response && response.errCode === 0) {
                toast.success('Create a new user successed!');
                dispatch(saveUseSucces());
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUseFailed())
            }
        } catch (e) {
            dispatch(saveUseFailed());
            console.log('saveUseFailed error', e)
        }
    }
}

export const saveUseSucces = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUseFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers('ALL')
            // console.log('check response :', response)

            if (response && response.errCode === 0) {
                dispatch(fetchAllUsesSucces(response.users.reverse()));
            } else {
                dispatch(fetchAllUsesFailed())
            }
        } catch (e) {
            dispatch(fetchAllUsesFailed());
            console.log('fetchAllUsesFailed error', e)
        }
    }
}

export const fetchAllUsesSucces = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsesFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let response = await deleteUserFromService(userId)
            console.log('check response :', response)
            if (response && response.errCode === 0) {
                toast.success('Delete user successed!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('Delete user error')
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error('Delete user error')
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let response = await editUserFromService(data)
            console.log('check response12 :', response)
            if (response && response.errCode === 0) {
                toast.success('Update user successed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('Update user error')
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error('Update user error')
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorHomeService('')
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: response.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTORS_FAILED: ", e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorsService()
            if (response && response.errCode === 0) {
                console.log("check data doctor: ", response)
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: response.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILED: ", e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveInforDoctorService(data)
            if (response && response.errCode === 0) {
                toast.success('Save Infor Doctor successed!');
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Save Infor Doctor failed!');
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error('Save Infor Doctor failed!');
            console.log("SAVE_INFOR_DOCTOR_FAILED: ", e)
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("TIME")
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: response.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const fetchAllDoctorInforStart = () => {
    return async (dispatch, getState) => {
        try {
            let responsePrice = await getAllCodeService("PRICE");
            let responsePayment = await getAllCodeService("PAYMENT");
            let responseProvince = await getAllCodeService("PROVINCE");
            let responseSpecialty = await getAllSpecialty();
            let responseClinic = await getAllClinic()

            if (responsePrice && responsePrice.errCode === 0
                && responsePayment && responsePayment.errCode === 0
                && responseProvince && responseProvince.errCode === 0
                && responseSpecialty && responseSpecialty.errCode === 0
                && responseClinic && responseClinic.errCode === 0
            ) {
                let data = {
                    responsePrice: responsePrice.data,
                    responsePayment: responsePayment.data,
                    responseProvince: responseProvince.data,
                    responseSpecialty: responseSpecialty.data,
                    responseClinic: responseClinic.data
                }
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_INFOR_SUCCESS,
                    data: data
                });

            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_INFOR_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_INFOR_FAILED
            });
            console.log('fetchAllDoctorInforFailed error', e)
        }
    }

}





