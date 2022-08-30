import * as types from '../actions/types';

const initialState = {
    isLoading:false,
    list:[],
    autoCompleteData:{}
}

export default function searchReducers(state=initialState,action) {
    switch(action.type){
        case types.SUCCESS_SEARCH_LESSONS:
            return {...state,list:action.payload} 
        case types.SUCCESS_AUTO_COMPLETE:
            return {...state,autoCompleteData:action.payload}
        case types.SUCCESS_DELETE_LESSON_IN_WEEK:
            return {...state,list:removeById(state.list,action.payload.id)}
        case types.UPDATE_LESSON:
            return {...state,isLoading:true}
        case types.SUCCESS_UPDATE_LESSON:
            return {...state,isLoading:false,list:[...updateLesson(state.list,action.payload)]}
        case types.UPDATE_BUSY_IN_WEEK:
            return {...state,isLoading:true}
        case types.SUCCESS_UPDATE_BUSY_IN_WEEK:
            return {...state,isLoading:false,list:[...updateLesson(state.list,action.payload)]}
        case types.RECEIVED_BUSY_IN_WEEK: 
            return {...state, isLoading: false} 
        case types.RECIEVED_NEW_LESSON_IN_WEEK: 
            return {...state, list: [...state.list, ...action.payload]} 
            case types.SUCCESS_DELETE_BUSY_IN_WEEK:
                return {...state,list:removeById(state.list,action.payload.id)}

        default:
            return state;

    }
}

function removeById(arr,id){
    return arr.filter(item => item.id !==id)
}

function updateLesson(arr,item){
    return arr.map(record => record.id === item.id ? item:record)
}