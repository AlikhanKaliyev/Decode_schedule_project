import * as types from '../actions/types';

const initialState = {
    isLoading:false,
    mentors:[]
}

export default function mentorsReducers(state=initialState,action) {
    switch(action.type){
        case types.RECEIVED_GET_MENTORS:
            return {...state,mentors:action.payload}
        case types.CREATE_MENTOR:
            return {...state,isLoading:true}
        case types.RECEIVED_NEW_MENTOR:
            return {...state,isLoading:false,mentors:[...state.mentors,action.payload]}
        case types.SUCCESS_DELETE_MENTOR:
            return {...state,mentors:removeById(state.mentors,action.payload.id)}
        case types.UPDATE_MENTOR:
            return {...state,isLoading:true}
        case types.SUCCESS_UPDATE_MENTOR:
            return {...state,isLoading:false,mentors:updateMentor(state.mentors,action.payload)}
        default:
            return state;
    }
}

function removeById(arr,id){
    return arr.filter(item => item.id !==id)
}

function updateMentor(arr,item){
    return arr.map(record => record.id === item.id ? item:record)
}