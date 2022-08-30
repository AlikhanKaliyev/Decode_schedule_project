const {Busy_in_week} = require('../models')
const createBusyInWeek = ({text,weekday,time,mentor_id}) =>{
    return new Promise(async resolve => {
        const busy_in_week = await Busy_in_week.create({
            text,
            weekday,
            time,
            mentor_id
        });
        resolve(busy_in_week);
}) }

const getBusyInWeek = (mentor_id) => {
    return new Promise(async resolve => {
        const busy_in_week = await Busy_in_week.findAll({
            include:['mentor'],
            where: {mentor_id}
        })
        resolve(busy_in_week);
})
}
const updateBusyInWeek = (data) => {
    return new Promise(async resolve => {
        const busy_in_week = await Busy_in_week.update({text:data.text,weekday:data.weekday,time:data.time},{where:{id:data.id}})
        const busyInWeek = await Busy_in_week.findOne( {
            include:['mentor'],
            where: {id: data.id}
        })
        resolve(busyInWeek);
})
}

const deleteBusyInWeek = async id => {
    return new Promise(async resolve=> {
        await Busy_in_week.destroy({where:{id}})
        resolve(true); 
    })
}
module.exports = {
    createBusyInWeek,
    getBusyInWeek,
    updateBusyInWeek,
    deleteBusyInWeek
}