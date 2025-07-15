const { query } = require('./db'); 

module.exports = {
  // GET: Fetch a full quiz (with questions and options)
  Getquiz: async (req, res) => {
    const { quizID } = req.params;

    try {
      const sql = `
        SELECT q.QuizID, q.Title, q.Category, 
               qs.QuestionID, qs.QuestionText, qs.CorrectAnswer, 
               o.OptionText
        FROM Quizzes q
        INNER JOIN Questions qs ON q.QuizID = qs.QuizID
        INNER JOIN Options o ON qs.QuestionID = o.QuestionID
        WHERE q.QuizID = ?;
      `;

      const result = await query(sql, [quizID]);

      res.json(result);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ message: 'Error fetching quiz' });
    }
  },

  // POST: Submit quiz result
  SubmitQuiz: async (req, res) => {
    const { userID, quizID, score } = req.body;

    try {
      await query(
        `INSERT INTO UserQuizResults (UserID, QuizID, Score) VALUES (?, ?, ?)`,
        [userID, quizID, score]
      );

      res.status(201).json({ message: 'Quiz result submitted successfully' });
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      res.status(500).json({ message: 'Error submitting quiz result' });
    }
  },
};
