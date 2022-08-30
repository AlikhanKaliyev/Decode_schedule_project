const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/isEmpty');
const {isAuth} = require('../middlewares/auth')
const {createLessonInWeekValidtor} = require('../validations/lesson_in_week.validation');
const {createLessonInWeek,updateLesson, deleteLesson} = require('../controllers/lesson_in_week.controller');
// router.post('/api/lesson-in-week',async (req,res,next) => {
//     const errors = createLessonInWeekValidator(req.body);
//     if(isEmpty(errors)){
//         try {
//             const lessonInWeek =await createLessonInWeek(req.body);
//             res.status(200).send(lessonInWeek);
//         } catch(e) {
//             res.status(500).send(e);
//         }
//     } else {
//         res.status(400).send(errors)
//     }
// })
router.post('/api/lesson-in-week' ,isAuth, async (req , res) => {
    const errors = await createLessonInWeekValidtor(req.body)
    if(isEmpty(errors)){
        try{
            let lessonsInWeek = []
            await req.body.lessonInputs.forEach(async item => {
                const lesson = await createLessonInWeek({
                    room_id: req.body.room_id,
                    course_id: req.body.course_id,
                    mentor_id: req.body.mentor_id,
                    group_id: req.body.group_id,
                    weekday: item.weekday,
                    time: item.time
                })
                await lessonsInWeek.push(lesson)
            }) 

            res.status(200).send(lessonsInWeek)

            
        }catch(e){
            console.log(e)
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(errors)
    }
})
router.put('/api/lesson-in-week', isAuth,async (req,res) => {
    try {
        const lesson = await updateLesson(req.body)
        res.status(200).send(lesson)
    } catch(error) {
        res.status(400).send(error)
    }

})

router.delete('/api/lesson-in-week/:id',isAuth, async (req,res) => {
    try {
        await deleteLesson(req.params.id)
        res.status(200).end()
    } catch(error) {
        res.status(400).send(error)
    }
})
module.exports = router;