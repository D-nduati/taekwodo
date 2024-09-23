const express = require('express')
const{login,signup,changepassword} = require('../controllers/userscontrollers')
const usersroute = express.Router()

usersroute.post('/login',login)
usersroute.post('/signup',signup)
usersroute.post('/changepassword',changepassword)

module.exports = {usersroute}