const express = require('express');
const adminRoutes = express.Router();

const {GetAllUsers, CreateNewUser,DeleteUser} = require('../Controlers/admin/adminUserMangement');
const {GetAllEvents, NewEvent,DeleteEvent} =require('../Controlers/admin/adminEventManagement');
const { SaveVideo, GetVideos} = require('../Controlers/admin/adminVideoManagement');
const {  GetQuizDetails, GetAllQuizzes, AddQuestion, CreateQuiz,JoinEvent,GetJoinedEvents,LeaveJoinedEvents } = require('../Controlers/admin/QuizManager');

const {createQuiz} = require('../Controlers/admin/AdminQuizCreation')

adminRoutes.get('/getusers',GetAllUsers);
adminRoutes.post('/createNewUser', CreateNewUser);
adminRoutes.delete('/deleteUser/:UserId',DeleteUser);

// for the events
adminRoutes.get('/getevents',GetAllEvents);
adminRoutes.post('/createEvents', NewEvent);
adminRoutes.delete('/deleteEvents/:id',DeleteEvent);

// for the video management
adminRoutes.post('/saveVideos',SaveVideo);
adminRoutes.get('/getVideos',GetVideos)

// for the quizes
adminRoutes.get('quizDetails/:quizId',GetQuizDetails);
adminRoutes.get('/getAllQuizzes',GetAllQuizzes);
adminRoutes.post('/addQuestion',AddQuestion);
// adminRoutes.post('/createQuiz',CreateQuiz);

//Just new quiz implementedd

adminRoutes.post('/createQuiz',CreateQuiz);
adminRoutes.post('/events/join/:id',JoinEvent);
adminRoutes.get('/events/joined/:id',GetJoinedEvents);
adminRoutes.delete('/events/leave/:id',LeaveJoinedEvents);


module.exports = {adminRoutes};