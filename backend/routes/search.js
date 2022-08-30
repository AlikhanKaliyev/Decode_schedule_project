const express = require('express');
const router = express.Router();
const {getLessons} = require('../controllers/lesson_in_week.controller')
const {getBusyInWeek} = require('../controllers/busy_in_week.controller')
const {getMentorsByName} = require('../controllers/mentor.controller')
const {getRoomByName} = require('../controllers/room.controller')
const {getGroupByName} = require('../controllers/group.controller')
router.get('/api/search', async(req,res)=>{
    const key = Object.keys(req.query)[0]
    const value = req.query[key]
    if (value && value.length > 0 && (key === 'mentor_id' || key === 'course_id' || key === 'room_id' || key ==='group_id'))
    {
        let list = await getLessons(key,value,req.query.start,req.query.end);
        if(key == 'mentor_id'){
            const busy_in_week = await getBusyInWeek(value)
            list = list.concat(busy_in_week)
        }
        res.status(200).send(list)
    } else res.status(200).send([]);
})
router.get('/api/search/:key', async(req,res)=>{
    const mentors = await getMentorsByName(req.params.key)
    const groups = await getGroupByName(req.params.key)
    const rooms = await getRoomByName(req.params.key)
    res.status(200).send({
        mentors,
        rooms,
        groups
    })
})
module.exports = router;