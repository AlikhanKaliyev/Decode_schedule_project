// const {sequelize,Sequelize} = require('../models');
// const {DataTypes} = require('sequelize');
// const Mentor = require('../models/mentor')(sequelize,Sequelize);
const {Mentor,Lesson_in_week,Busy_in_week,Sequelize} = require('../models')

const Op = Sequelize.Op
const getMentors = async (req,res) =>{
    const mentors = await Mentor.findAll();
    res.status(200).send(mentors);
}
const getMentorsByName = async (query) => {
    return new Promise(async resolve => {
        const mentors = await Mentor.findAll({
            where: {
                fullname:{
                    [Op.like] : `%${query}%`
                }
            }
        })
        resolve(mentors);
})
}
const createMentor = (fullname) =>{
    return new Promise(async resolve => {
        const mentor = await Mentor.create(fullname)
        resolve(mentor);
})
}
const updateMentor = ({fullname,id}) => {
    return new Promise(async resolve => {
        const mentor = await Mentor.update({fullname},{where:{id}})
        resolve(mentor);
})
}
const deleteMentor = async id => {
    return new Promise(async resolve=> {
        await Lesson_in_week.destroy({where:{mentor_id:id}})
        await Busy_in_week.destroy({where:{mentor_id:id}})
        await Mentor.destroy({where:{id}})
        resolve(true); 
    })
}
module.exports = {
    getMentors,
    getMentorsByName,
    createMentor,
    updateMentor,
    deleteMentor
}