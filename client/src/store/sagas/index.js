import {all} from 'redux-saga/effects'
import { groupSagas } from './groupSaga'
import {mentorSagas} from './mentorSagas'
import { searchSagas } from './searchSagas'
import { courseSagas } from './courseSagas';
import { roomSagas } from './roomSagas';
import { lessonSagas } from './lessonSagas';
import {loginAdminSagas} from './loginAdminSagas'
export default function* rootSaga(){
    yield all([
        mentorSagas(),
        searchSagas(),
        groupSagas(),
        courseSagas(),
        roomSagas(),
        lessonSagas(),
        loginAdminSagas()
    ])
}