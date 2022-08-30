import * as types from './types';
export function getGroups(data){
    return {data,type:types.GET_GROUPS} 
}

export function createGroup(name,start,end){
    return {type:types.CREATE_GROUP,name,start,end}
}

export function deleteGroup(id) {
    return {type:types.DELETE_GROUP,id}
}

export function updateGroup(data) {
    return {type:types.UPDATE_GROUP,...data}
}