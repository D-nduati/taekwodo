const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
};

module.exports ={
Getquiz: async (req, res) => {
    const { quizID } = req.params;
    
    try {
      const pool = await sql.connect(config);
      const quizDetails = await pool.query`
        SELECT q.QuizID, q.Title, q.Category, qs.QuestionID, qs.QuestionText, qs.CorrectAnswer, o.OptionText
        FROM Quizzes q
        INNER JOIN Questions qs ON q.QuizID = qs.QuizID
        INNER JOIN Options o ON qs.QuestionID = o.QuestionID
        WHERE q.QuizID = ${quizID};
      `;
      
      res.json(quizDetails.recordset);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quiz' });
    }
  },
  
   SubmitQuiz:async (req, res) => {
    const { userID, quizID, score } = req.body;
  
    try {
      const pool = await sql.connect(config);
      await pool.query`
        INSERT INTO UserQuizResults (UserID, QuizID, Score)
        VALUES (${userID}, ${quizID}, ${score});
      `;
  
      res.status(201).json({ message: 'Quiz result submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting quiz result' });
    }
  }
};
  