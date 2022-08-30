import {all,put,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';
function* getMentors(){
    try {
        const MENTORS = yield axios.get(`${BASE_URL}/api/mentors`).then(res => res.data);
        yield put({type:types.RECEIVED_GET_MENTORS,payload:MENTORS})
    } catch(e) {
        yield put({type:types.FAILURE_GET_MENTORS, errors:e})
    }
}

function* createMentor({name}){
    try {
        
        const MENTOR = yield axios.post(`${BASE_URL}/api/mentors`,{fullname:name}).then(res => res.data);
        yield put({type:types.RECEIVED_NEW_MENTOR,payload:MENTOR})
    } catch(e) {
        yield put({type:types.FAILURE_CREATE_MENTOR, errors:e})
    }
}

function* deleteMentor({id}){
    try {
        const MENTOR = yield axios.delete(`${BASE_URL}/api/mentors/${id}`).then(res => res.data);
        yield put({type:types.SUCCESS_DELETE_MENTOR,payload:{id}})
    } catch(e) {
        yield put({type:types.FAILURE_DELETE_MENTOR, errors:e})
    }
}

function* updateMentor({id,name}){
    try {
        const MENTOR = yield axios.put(`${BASE_URL}/api/mentors`,{id,fullname:name}).then(res => res.data);
        yield put({type:types.SUCCESS_UPDATE_MENTOR,payload:{id,fullname:name}})
    } catch(e) {
        yield put({type:types.FAILURE_UPDATE_MENTOR, errors:e})
    }
}

export function* mentorSagas(){
    yield all([
        yield takeLatest(types.GET_MENTORS,getMentors),
        yield takeLatest(types.CREATE_MENTOR,createMentor),
        yield takeLatest(types.DELETE_MENTOR,deleteMentor),
        yield takeLatest(types.UPDATE_MENTOR,updateMentor)
    ])
}