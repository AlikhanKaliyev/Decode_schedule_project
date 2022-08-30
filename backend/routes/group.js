const express = require('express');
const router = express.Router();
const {isAuth} = require('../middlewares/auth')
const {isEmpty} = require('../utils/isEmpty');
const {createGroupValidator} = require('../validations/group.validations');
const {createGroup,getGroups,updateGroup,deleteGroup} = require('../controllers/group.controller');

router.get('/api/groups', getGroups)

router.post('/api/groups',isAuth,async (req,res,next) => {
    const errors = createGroupValidator(req.body);
    if(isEmpty(errors)){
        try {
            const group =await createGroup(req.body);
            res.status(200).send(group);
        } catch(e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send(errors)
    }
})

router.put('/api/groups', isAuth,async (req,res) => {
    try {
        const group = await updateGroup(req.body)
        res.status(200).send(group)
    } catch(error) {
        res.status(400).send(error)
    }

})
router.delete('/api/groups/:id', isAuth,async (req,res) => {
    try {
        await deleteGroup(req.params.id)
        res.status(200).end()
    } catch(error) {
        res.status(400).send(error)
    }
})


module.exports = router;