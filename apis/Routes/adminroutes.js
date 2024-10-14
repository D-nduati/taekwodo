const express = require('express');
const adminRoutes = express.Router();

const {GetAllUsers, CreateNewUser,DeleteUser} = require('../Controlers/admin/adminUserMangement');
const {GetAllEvents, NewEvent,DeleteEvent} =require('../Controlers/admin/adminEventManagement');
const { SaveVideo} = require('../Controlers/admin/adminVideoManagement');
const {  GetQuizDetails, GetAllQuizzes, AddQuestion, CreateQuiz } = require('../Controlers/admin/QuizManager');

adminRoutes.get('/getusers',GetAllUsers);
adminRoutes.post('/createNewUser', CreateNewUser);
adminRoutes.delete('/deleteUser/:id',DeleteUser);

// for the events
adminRoutes.get('/getevents',GetAllEvents);
adminRoutes.get('/createEvents', NewEvent);
adminRoutes.get('/deleteEvents/:id',DeleteEvent);

// for the video management
adminRoutes.get('/saveVideos',SaveVideo);

// for the quizes
adminRoutes.get('quizDetails/:quizId',GetQuizDetails);
adminRoutes.get('/getAllQuizzes',GetAllQuizzes);
adminRoutes.post('/addQuestion',AddQuestion);
adminRoutes.post('/createQuiz',CreateQuiz);


module.exports = {adminRoutes};