const express = require('express');
const adminRoutes = express.Router();

const {GetAllUsers, CreateNewUser,DeleteUser} = require('../Controlers/admin/adminUserMangement');
const {GetAllEvents, NewEvent,DeleteEvent} =require('../Controlers/admin/adminEventManagement');
const { SaveVideo} = require('../Controlers/admin/adminVideoManagement')

adminRoutes.get('/getusers',GetAllUsers);
adminRoutes.post('/createNewUser', CreateNewUser);
adminRoutes.delete('/deleteUser',DeleteUser);

// for the events
adminRoutes.get('/getevents',GetAllEvents);
adminRoutes.get('/createEvents', NewEvent);
adminRoutes.get('/deleteEvents/:id',DeleteEvent);

// for the video management
adminRoutes.get('/saveVideos',SaveVideo);



module.exports = {adminRoutes};