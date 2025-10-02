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
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(304).json({ message: "could not get quiz" })
      }

      // res.json(result);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ message: 'Error fetching quiz' });
    }
  },

  // POST: Submit quiz result
  SubmitQuiz: async (req, res) => {
    const { userId, quizID, score } = req.body;

    // Validate required fields
    if (!userId || !quizID || score === undefined) {
        return res.status(400).json({ 
            message: 'Missing required fields: userId, quizID, score' 
        });
    }

    try {
        // Check if user has already taken this specific quiz
        const existingResults = await query(
            'SELECT UserID, QuizID, Score FROM UserQuizResults WHERE UserID = ? AND QuizID = ?',
            [userId, quizID]
        );

        // If user has already taken this quiz
        if (existingResults.length > 0) {
            const previousScore = existingResults[0].Score;
            return res.status(409).json({ 
                message: `You have already completed this test. Your previous score was: ${previousScore}`,
                previousScore: previousScore,
                quizID: quizID
            });
        }

        // If user hasn't taken the quiz, insert new result
        const result = await query(
            `INSERT INTO UserQuizResults (UserID, QuizID, Score) VALUES (?, ?, ?)`,
            [userId, quizID, score]
        );

        if (result.affectedRows === 1) {
            return res.status(201).json({ 
                message: 'Quiz result submitted successfully',
                score: score,
                quizID: quizID
            });
        } else {
            return res.status(500).json({ 
                message: 'Failed to submit quiz result' 
            });
        }

    } catch (error) {
        console.error('Quiz submission error:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
}
};
