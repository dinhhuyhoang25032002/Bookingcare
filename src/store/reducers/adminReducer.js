import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoginGender: false,
    isLoginPosition: false,
    isLoginRole: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allTimeSchedule: [],
    allDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoginGender = true
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data
            state.isLoginGender = false
            //console.log('fire check2', copyState)
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire chec3k', action)
            state.isLoginGender = false
            state.genders = [];
            return {
                ...state,

            }
        //POSITION
        case actionTypes.FETCH_POSITION_START:
            state.isLoginPosition = true
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data
            state.isLoginPosition = false
            //console.log('fire check2', copyState)
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoginPosition = false
            state.positions = []
            return {
                ...state,

            }
        //ROLE
        case actionTypes.FETCH_ROLE_START:
            state.isLoginRole = true
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data
            state.isLoginRole = false
            //console.log('fire check2', copyState)
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoginRole = false
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allTimeSchedule = action.dataTime;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allTimeSchedule = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTOR_INFOR_SUCCESS:
            state.allDoctorInfor = action.data;
            //console.log("hoang check action: ", action)
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTOR_INFOR_FAILED:
            state.allDoctorInfor = [];
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;