import * as types from '../actions/types';

const initialState = {
    token:{}
}


export default function loginAdminReducers(state=initialState, action) {
    switch(action.type) {
        case types.LOGIN_ADMIN: 
            return {...state};
        case types.FAILURE_LOGIN_ADMIN:
            alert("Неправильный email или пароль");
            return state;
        case types.SUCCESS_LOGIN_ADMIN:
            return {...state,token:action.payload}
        default:
            return state;
    }
}