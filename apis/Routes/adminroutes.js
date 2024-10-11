const express = require('express')
const adminRoutes = express.Router()

const{GetAllUsers, CreateNewUser,DeleteUser} = require('../Controlers/adminRelated')

adminRoutes.get('/getusers',GetAllUsers)
adminRoutes.post('/ createNewUser', CreateNewUser)
adminRoutes.delete('/deleteUser',DeleteUser)

module.exports = {adminRoutes}