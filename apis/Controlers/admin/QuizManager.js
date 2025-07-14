const { query } = require('../db'); 

module.exports = {
  // Create a new quiz
  CreateQuiz: async (req, res) => {
    const { category, title } = req.body;
    try {
      // Insert quiz
      const insertResult = await query(
        'INSERT INTO Quizzes (Category, Title) VALUES (?, ?)',
        [category, title]
      );

      // Get the inserted quiz using insertId
      const [quiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [insertResult.insertId]);

      res.status(201).json(quiz);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Add a question and its options
  AddQuestion: async (req, res) => {
    const { quizId, questionText, correctAnswer, options } = req.body;

    try {
      // Insert question
      const questionResult = await query(
        'INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer) VALUES (?, ?, ?)',
        [quizId, questionText, correctAnswer]
      );

      const questionId = questionResult.insertId;

      // Insert options
      for (const option of options) {
        await query(
          'INSERT INTO Options (QuestionID, OptionText) VALUES (?, ?)',
          [questionId, option]
        );
      }

      // Return inserted question
      const [question] = await query('SELECT * FROM Questions WHERE QuestionID = ?', [questionId]);

      res.status(201).json({ question });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Fetch all quizzes
  GetAllQuizzes: async (req, res) => {
    try {
      const quizzes = await query('SELECT * FROM Quizzes');
      res.json(quizzes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Fetch quiz with its questions and options
  GetQuizDetails: async (req, res) => {
    const { quizId } = req.params;

    try {
      const [quiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [quizId]);

      const questions = await query(`
        SELECT q.QuestionID, q.QuestionText, q.CorrectAnswer, o.OptionText
        FROM Questions q
        JOIN Options o ON q.QuestionID = o.QuestionID
        WHERE q.QuizID = ?
      `, [quizId]);

      res.json({ quiz, questions });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
