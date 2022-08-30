const {User} = require('../models')
const bcrypt = require('bcryptjs')
const { urlencoded } = require('express')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/config')
const createAdmin = async () => {
    const user = await User.findOne({
        where:{
            email:"admin@gmail.com"
        }
    })
    if(!user)  createUser({email:"admin@gmail.com",password:"decode"})
}   
const createUser = user => new Promise(resolve => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, async function(err, hash) {
            const newuser = await User.create({
                email:user.email,
                password:hash
            })
            resolve(newuser)           
        });
    });
}
)

const login = user => new Promise(async resolve => {
    const isUser = await User.findOne({
        where:{
            email:user.email
        }
    }
    )
    console.log(isUser)
    if(!isUser) return resolve(null)
    bcrypt.compare(user.password, isUser.password, function(err, isMatch) {
        if(!isMatch) return resolve(null)
        
        const token = jwt.sign({
            exp: (Math.floor(Date.now() / 1000) + (60 * 60)) * 24 *365,
            id:isUser.id,
            email:isUser.email,
          }, SECRET_KEY);
          resolve(token)
    });
})
const getUserById = id => new Promise(async resolve => {
    const user = await User.findOne({
        where: {
            id,
        }
    })
    resolve(user)
})

module.exports = {
    createAdmin,
    createUser,
    login,
    getUserById
}