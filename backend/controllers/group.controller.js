const {Group,Lesson_in_week,Sequelize} = require('../models')
const Op = Sequelize.Op

const getGroups = async (req,res) =>{
    const groups = await Group.findAll();
    res.status(200).send(groups);
}

const createGroup = ({name,start,end}) =>{
    return new Promise(async resolve => {
        const group = await Group.create({
            name,
            start,
            end
        });
        resolve(group);
}) }
const getGroupByName =  async (query) => {
    return new Promise(async resolve => {
        const groups = await Group.findAll({
            where: {
                name:{
                    [Op.like] : `%${query}%`
                }
            }
        })
        resolve(groups);
})
}
const deleteGroup = async id => {
    return new Promise(async resolve=> {
        await Lesson_in_week.destroy({where:{group_id:id}})
        await Group.destroy({where:{id}})
        resolve(true); 
    })
}

const updateGroup = (data) => {
    return new Promise(async resolve => {
        const group = await Group.update({name:data.name,start:data.start,end:data.end},{where:{id:data.id}})
        resolve(group);
})
}



module.exports = {
    createGroup,
    getGroupByName,
    getGroups,
    updateGroup,
    deleteGroup
}