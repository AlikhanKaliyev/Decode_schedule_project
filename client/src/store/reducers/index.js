import {combineReducers} from 'redux';
import mentorsReducers from './mentorReducers';
import searchReducers from './searchReducer';
import groupReducers from './groupReducer';
import roomsReducers from './roomReducers';
import coursesReducers from './courseReducers';
import lessonsReducers from './lessonReducers';
import loginAdminReducers from './loginAdminReducers';

export default combineReducers({
    mentorsReducers,
    searchReducers,
    groupReducers,
    roomsReducers,
    coursesReducers,
    lessonsReducers,
    loginAdminReducers
})