import * as types from '../actions/types';

const initialState = {
    isLoading:false,
    groups:[]
}

export default function groupReducers(state=initialState,action) {
    switch(action.type){
        case types.RECEIVED_GET_GROUPS:
            return {...state,groups:action.payload}
        case types.CREATE_GROUP:
            return {...state,isLoading:true}
        case types.RECEIVED_NEW_GROUP:
            return {...state,isLoading:false,groups:[...state.groups,action.payload]}
        case types.SUCCESS_DELETE_GROUP:
            return {...state,groups:removeById(state.groups,action.payload.id)}
        case types.UPDATE_GROUP:
            return {...state,isLoading:true}
        case types.SUCCESS_UPDATE_GROUP:
            return {...state,isLoading:false,groups:updateGroup(state.groups,action.payload)}
        default:
            return state;
    }
}

function removeById(arr,id){
    return arr.filter(item => item.id !==id)
}
function updateGroup(arr,item){
    return arr.map(record => record.id === item.id ? item:record)
}