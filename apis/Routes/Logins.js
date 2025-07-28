const express = require('express')
const usersroute = express.Router()

const{login,signup,changepassword, forgotPassword} = require('../Controlers/LoginsControllers')

usersroute.post('/login',login)
usersroute.post('/signup',signup)
usersroute.post('/changepassword',changepassword)
usersroute.post('/forgot',forgotPassword)


module.exports = {usersroute};