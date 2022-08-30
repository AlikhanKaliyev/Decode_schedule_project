// const { Model } = require('sequelize/types');
const {Lesson_in_week,Group,Sequelize} = require('../models')
const Op = Sequelize.Op
const createLessonInWeek = ({course_id,group_id,room_id,time,weekday,mentor_id}) =>{
    return new Promise(async resolve => {
        const lesson_in_week = await Lesson_in_week.create({
            course_id,group_id,room_id,time,weekday,mentor_id
        });
        resolve(lesson_in_week);
}) }

const getLessons = (key,value,start,end) => {
    return new Promise(async resolve => {
        if(!start){
        const lesson_in_week = await Lesson_in_week.findAll({
            include:['mentor','course','room','group'],
            where: {[key]:value}
        })
        resolve(lesson_in_week);
    } else {
        const lesson_in_week = await Lesson_in_week.findAll({
            include:['mentor','course','room','group'],
            where: {
                [Op.and]: [
                    {[key] : value},

                    {
                        '$group.start$': {
                            [Op.lte]: new Date(end)
                        }
                    },
                    {
                        '$group.end$': {
                            [Op.gte]: new Date(start)
                        }
                    }
                ]
                
            }
        })
        resolve(lesson_in_week);
    
    }    
    })
}

const updateLesson = (data) => {
    return new Promise(async resolve => {
        await Lesson_in_week.update({
            course_id:data.course_id,
            group_id:data.group_id,
            room_id:data.room_id,
            mentor_id:data.mentor_id,
            weekday:data.weekday,
            time:data.time
        },{where:{id:data.id}})
        const lesson = await Lesson_in_week.findOne( {
            include:['mentor','course','room','group'],
            where: {id: data.id}
        })

        resolve(lesson);
})
}
const deleteLesson = async id => {
    return new Promise (async resolve =>{
        await Lesson_in_week.destroy({where:{id}})
        resolve(true)
    }

    )
}

module.exports = {
    createLessonInWeek,
    getLessons,
    updateLesson,
    deleteLesson
}