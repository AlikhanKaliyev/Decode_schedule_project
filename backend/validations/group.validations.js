const {isEmpty} = require('../utils/isEmpty');
const createGroupValidator = ({name,start,end}) => {
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length == 0){
        errors.name = "Название группы не может быть пустым";
    }
    if(!start || !Date.parse(start)){
        errors.start = "Старт группы не должен быть пустым";
    }
    if(!end || !Date.parse(end)){
        errors.end = "Дата окончания группы не должна быть пустой";
    }
    return errors;
}


module.exports = {
    createGroupValidator
}