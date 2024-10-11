const sql = require('mssql');

const config = {
  connectionString: 'Driver=SQL Server;Server=YOUR_SERVER;Database=Taekwondo;Trusted_Connection=true;',
};

module.exports = {
  CreateQuiz: async (req, res) => {
    const { category, title } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        INSERT INTO Quizzes (Category, Title) 
        VALUES (${category}, ${title});
        SELECT * FROM Quizzes WHERE QuizID = SCOPE_IDENTITY();
      `;

      res.status(201).json(result.recordset[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
  CreateQuestion: async (req, res) => {
    const { quizID, questionText, correctAnswer, options } = req.body;

    try {
      const pool = await sql.connect(config);
      const questionResult = await pool.query`
        INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer)
        VALUES (${quizID}, ${questionText}, ${correctAnswer});
        SELECT * FROM Questions WHERE QuestionID = SCOPE_IDENTITY();
      `;
      
      const questionID = questionResult.recordset[0].QuestionID;

      for (const option of options) {
        await pool.query`
          INSERT INTO Options (QuestionID, OptionText)
          VALUES (${questionID}, ${option});
        `;
      }

      res.status(201).json({ message: 'Question and options created successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  GetUserQuiz: async (req, res) => {
    const { userID } = req.params;
    
    try {
      const pool = await sql.connect(config);
      const userQuizResult = await pool.query`
        SELECT q.QuizID, q.Category, q.Title
        FROM Quizzes q
        INNER JOIN UserQuizResults uqr ON q.QuizID = uqr.QuizID
        WHERE uqr.UserID = ${userID};
      `;

      res.json(userQuizResult.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  SubmitQuizResult: async (req, res) => {
    const { userID, quizID, score } = req.body;

    try {
      const pool = await sql.connect(config);
      await pool.query`
        INSERT INTO UserQuizResults (UserID, QuizID, Score)
        VALUES (${userID}, ${quizID}, ${score});
      `;

      res.status(201).json({ message: 'Quiz result submitted' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  RankUser: async (req, res) => {
    const { userID } = req.params;

    try {
      const pool = await sql.connect(config);
      const userRank = await pool.query`
        SELECT AVG(Score) as AverageScore 
        FROM UserQuizResults 
        WHERE UserID = ${userID};
      `;

      res.json({ rank: userRank.recordset[0].AverageScore });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
