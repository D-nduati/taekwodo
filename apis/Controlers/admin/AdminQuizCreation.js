const express = require('express');
const sql = require('mssql');
const router = express.Router();

const config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
  };

  module.exports= {
    createQuiz: async (req, res) => {
        const { category, title, questions } = req.body;
      
        try {
          const pool = await sql.connect(config);
          const quizResult = await pool.query`
            INSERT INTO Quizzes (Category, Title)
            VALUES (${category}, ${title});
            SELECT SCOPE_IDENTITY() as QuizID;
          `;
      
          const quizID = quizResult.recordset[0].QuizID;
      
          for (const question of questions) {
            const questionResult = await pool.query`
              INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer)
              VALUES (${quizID}, ${question.questionText}, ${question.correctAnswer});
              SELECT SCOPE_IDENTITY() as QuestionID;
            `;
            
            const questionID = questionResult.recordset[0].QuestionID;
      
            for (const optionText of question.options) {
              await pool.query`
                INSERT INTO Options (QuestionID, OptionText)
                VALUES (${questionID}, ${optionText});
              `;
            }
          }
      
          res.status(201).json({ message: 'Quiz created successfully' });
        } catch (error) {
          console.error('Error creating quiz:', error);
          res.status(500).json({ message: 'Error creating quiz' });
        }
      }

  };


