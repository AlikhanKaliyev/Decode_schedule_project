const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/isEmpty');
const {createBusyInWeekValidator} = require('../validations/busy_in_week.validation');
const {createBusyInWeek,updateBusyInWeek,deleteBusyInWeek} = require('../controllers/busy_in_week.controller');
const { isAuth } = require('../middlewares/auth');
router.post('/api/busy-in-week' ,isAuth, async (req , res) => {
    const errors = createBusyInWeekValidator(req.body)
    if(isEmpty(errors)){
        try{

            let busyInWeeks = []
            await req.body.lessonInputs.forEach(async item => {
                const busy = await createBusyInWeek({
                    mentor_id: req.body.mentor_id,
                    text: req.body.text,
                    weekday: item.weekday,
                    time: item.time
                })
                await busyInWeeks.push(busy)
            }) 

            res.status(200).send(busyInWeeks)


        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(errors)
    }
})

router.put('/api/busy-in-week', isAuth,async (req,res) => {
    try {
        const busy_in_week = await updateBusyInWeek(req.body)
        res.status(200).send(busy_in_week)
    } catch(error) {
        res.status(400).send(error)
    }

})

router.delete('/api/busy-in-week/:id',isAuth, async (req,res) => {
    try {
        await deleteBusyInWeek(req.params.id)
        res.status(200).end()
    } catch(error) {
        res.status(400).send(error)
    }
})
module.exports = router;