const express = require('express');
const adminRoutes = express.Router();

const {GetAllUsers, CreateNewUser,DeleteUser} = require('../Controlers/admin/adminUserMangement');
const {GetAllEvents, NewEvent,DeleteEvent} =require('../Controlers/admin/adminEventManagement');
const { SaveVideo, GetVideos} = require('../Controlers/admin/adminVideoManagement');
const {  GetQuizDetails, GetAllQuizzes, AddQuestion, CreateQuiz } = require('../Controlers/admin/QuizManager');

const {createQuiz} = require('../Controlers/admin/AdminQuizCreation')

adminRoutes.get('/getusers',GetAllUsers);
adminRoutes.post('/createNewUser', CreateNewUser);
adminRoutes.delete('/deleteUser/:UserId',DeleteUser);

// for the events
adminRoutes.get('/getevents',GetAllEvents);
adminRoutes.post('/createEvents', NewEvent);
adminRoutes.delete('/deleteEvents',DeleteEvent);

// for the video management
adminRoutes.post('/saveVideos',SaveVideo);
adminRoutes.get('/getVideos',GetVideos)

// for the quizes
adminRoutes.get('quizDetails/:quizId',GetQuizDetails);
adminRoutes.get('/getAllQuizzes',GetAllQuizzes);
adminRoutes.post('/addQuestion',AddQuestion);
// adminRoutes.post('/createQuiz',CreateQuiz);

//Just new quiz implementedd

adminRoutes.post('/createQuiz',CreateQuiz)


module.exports = {adminRoutes};