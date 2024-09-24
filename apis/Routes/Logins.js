const express = require('express')
const usersroute = express.Router()

const{login,signup,changepassword} = require('../Controlers/LoginsControllers')

usersroute.post('/login',login)
usersroute.post('/signup',signup)
usersroute.post('/changepassword',changepassword)

module.exports = {usersroute}