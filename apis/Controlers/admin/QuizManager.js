
module.exports.CreateQuiz = async (req, res) => {
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
  };

  module.exports.AddQuestion = async (req, res) => {
    const { quizId, questionText, correctAnswer, options } = req.body;
  
    try {
      const pool = await sql.connect(config);
  
      const questionResult = await pool.query`
        INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer)
        VALUES (${quizId}, ${questionText}, ${correctAnswer});
        SELECT * FROM Questions WHERE QuestionID = SCOPE_IDENTITY();
      `;
  
      const question = questionResult.recordset[0];
  
      // Insert options
      for (const option of options) {
        await pool.query`
          INSERT INTO Options (QuestionID, OptionText)
          VALUES (${question.QuestionID}, ${option});
        `;
      }
  
      res.status(201).json({ question });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  module.exports.GetAllQuizzes = async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        SELECT * FROM Quizzes;
      `;
  
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  module.exports.GetQuizDetails = async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const pool = await sql.connect(config);
  
      const quizResult = await pool.query`
        SELECT * FROM Quizzes WHERE QuizID = ${quizId};
      `;
      
      const questionsResult = await pool.query`
        SELECT q.QuestionID, q.QuestionText, q.CorrectAnswer, o.OptionText
        FROM Questions q
        JOIN Options o ON q.QuestionID = o.QuestionID
        WHERE q.QuizID = ${quizId};
      `;
  
      res.json({
        quiz: quizResult.recordset[0],
        questions: questionsResult.recordset,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  
  
  



















;
  
  
   