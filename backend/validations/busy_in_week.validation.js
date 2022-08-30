const {isEmpty} = require('../utils/isEmpty');
const {isWeekDay}= require('../utils/isWeekDay')
const {isTime} = require('../utils/isTime')
const createBusyInWeekValidator = async ({mentor_id,text , lessonInputs}) => {
    const errors = {};
    errors.lessonInputs = [];
    if(lessonInputs){
    await lessonInputs.map((item, index) => {
        if(!item.weekday || !isWeekDay(item.weekday)) {
            errors.lessonInputs[index] = {}
            errors.lessonInputs[index].weekday = 'Некорректный день недели';
        }
        if(!item.time || !isTime(item.time)) {
            console.log("tut")
            !errors.lessonInputs[index] ? errors.lessonInputs[index] = {} : '';
            errors.lessonInputs[index].time = 'Некорретное время';
        }
    })


    if(errors.lessonInputs.length === 0) {
        delete errors.lessonInputs
    }
    if(!text && typeof(text)!=='string' || text.trim().length ==0){
        errors.text = 'Причина не может быть пустой'
    }
    mentor_id *= 1;
    if(!mentor_id || typeof(mentor_id) !== 'number') {
        errors.mentor_id = 'Выберите ментора';
    }
    console.log(errors)
    }
    return errors
}


module.exports = {
    createBusyInWeekValidator
}