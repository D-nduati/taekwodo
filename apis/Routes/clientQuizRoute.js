const express = require('express');
const clientQuiz = express.Router();
const {Getquiz, SubmitQuiz} = require('../Controlers/ClientQuizFetchANDSubmit')


clientQuiz.post('/clientQuiz/:quizID',Getquiz)
clientQuiz.post('/quiz/submit',SubmitQuiz),


module.exports = {clientQuiz}