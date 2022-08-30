import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/base-url';
import { useNavigate } from "react-router-dom";

function* loginAdmin({data, navigate}){
    try{
        const adminToken = yield axios.post(`${BASE_URL}/api/signin`,data).then(res => res.data);
        if (adminToken){
            axios.defaults.headers.common['authorization'] = `Bearer ${adminToken.token}`;
            localStorage.setItem('token',adminToken.token)
            navigate("../admin");
        }
        yield put({type:types.SUCCESS_LOGIN_ADMIN , payload : adminToken})
    }catch(e){
        yield put({type: types.FAILURE_LOGIN_ADMIN , errors: e})
    }
}


export function* loginAdminSagas(){
    yield all([
        yield takeLatest(types.LOGIN_ADMIN, loginAdmin),
    ])
}