// const { query } = require('../db'); 

// module.exports = {
//   // Create a new quiz
//   CreateQuiz: async (req, res) => {
//     const { category, title } = req.body;
//     try {
//       // Insert quiz
//       const insertResult = await query(
//         'INSERT INTO Quizzes (Category, Title) VALUES (?, ?)',
//         [category, title]
//       );

//       // Get the inserted quiz using insertId
//       const [quiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [insertResult.insertId]);

//       res.status(201).json(quiz);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   },

//   // Add a question and its options
//   AddQuestion: async (req, res) => {
//     const { quizId, questionText, correctAnswer, options } = req.body;

//     try {
//       // Insert question
//       const questionResult = await query(
//         'INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer) VALUES (?, ?, ?)',
//         [quizId, questionText, correctAnswer]
//       );

//       const questionId = questionResult.insertId;

//       // Insert options
//       for (const option of options) {
//         await query(
//           'INSERT INTO Options (QuestionID, OptionText) VALUES (?, ?)',
//           [questionId, option]
//         );
//       }

//       // Return inserted question
//       const [question] = await query('SELECT * FROM Questions WHERE QuestionID = ?', [questionId]);

//       res.status(201).json({ question });
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   },

//   // Fetch all quizzes
//   GetAllQuizzes: async (req, res) => {
//     try {
//       const quizzes = await query('SELECT * FROM Quizzes');
//       res.json(quizzes);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   },

//   // Fetch quiz with its questions and options
//   GetQuizDetails: async (req, res) => {
//     const { quizId } = req.params;

//     try {
//       const [quiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [quizId]);

//       const questions = await query(`
//         SELECT q.QuestionID, q.QuestionText, q.CorrectAnswer, o.OptionText
//         FROM Questions q
//         JOIN Options o ON q.QuestionID = o.QuestionID
//         WHERE q.QuizID = ?
//       `, [quizId]);

//       res.json({ quiz, questions });
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   }, 



   

//   }

  

// };
const { query } = require('../db'); 

module.exports = {
  // Create a complete quiz with questions and options
  CreateCompleteQuiz: async (req, res) => {
    const { category, title, questions } = req.body;
    
    try {
      // Start transaction
      await query('START TRANSACTION');

      // Insert quiz
      const quizResult = await query(
        'INSERT INTO Quizzes (Category, Title) VALUES (?, ?)',
        [category, title]
      );
      const quizId = quizResult.insertId;

      // Insert questions and options
      for (const question of questions) {
        const questionResult = await query(
          'INSERT INTO Questions (QuizID, QuestionText, CorrectAnswer) VALUES (?, ?, ?)',
          [quizId, question.questionText, question.correctAnswer]
        );
        const questionId = questionResult.insertId;

        // Insert options
        for (const optionText of question.options) {
          await query(
            'INSERT INTO Options (QuestionID, OptionText) VALUES (?, ?)',
            [questionId, optionText]
          );
        }
      }

      await query('COMMIT');
      
      // Return complete quiz data
      const [newQuiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [quizId]);
      res.status(201).json({ 
        message: 'Quiz created successfully', 
        quiz: newQuiz 
      });
    } catch (err) {
      await query('ROLLBACK');
      res.status(500).json({ error: err.message });
    }
  },

  // Get quiz details for user
  GetQuizDetails: async (req, res) => {
    const { quizId } = req.params;

    try {
      // Get quiz basic info
      const [quiz] = await query('SELECT * FROM Quizzes WHERE QuizID = ?', [quizId]);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      // Get questions with options
      const questionsData = await query(`
        SELECT 
          q.QuestionID, 
          q.QuestionText, 
          q.CorrectAnswer,
          o.OptionID,
          o.OptionText,
          o.OptionOrder
        FROM Questions q
        LEFT JOIN Options o ON q.QuestionID = o.QuestionID
        WHERE q.QuizID = ?
        ORDER BY q.QuestionID, o.OptionID
      `, [quizId]);

      // Format the data properly
      const questions = questionsData.reduce((acc, row) => {
        let question = acc.find(q => q.questionID === row.QuestionID);
        if (!question) {
          question = {
            questionID: row.QuestionID,
            questionText: row.QuestionText,
            correctAnswer: row.CorrectAnswer,
            options: []
          };
          acc.push(question);
        }
        if (row.OptionText) {
          question.options.push(row.OptionText);
        }
        return acc;
      }, []);

      res.json({
        quizID: quiz.QuizID,
        title: quiz.Title,
        category: quiz.Category,
        questions: questions
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Submit quiz results
  SubmitQuiz: async (req, res) => {
    const { userId, quizID, score } = req.body;
    
    try {
     const result=  await query(
        'INSERT INTO QuizResults (UserID, QuizID, Score) VALUES (?, ?, ?)',
        [userId, quizID, score]
      );
      if(result.affectedRows>1){
        res.status(201).json({ message: 'Quiz result submitted successfully' });
      }else{
        res.status(304).json({ message: 'Quiz result were not submitted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get all quizzes (for selection)
  GetAllQuizzes: async (req, res) => {
    try {
      const quizzes = await query('SELECT QuizID, Title, Category FROM Quizzes');
      if(quizzes){
        res.status(200).json(quizzes);
      }
      else{
        res.status(304).json({message:"No Data"})
      }
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  JoinEvent: async (req, res) => {
    const { id } = req.params;
    const {userId} = req.body;

    try {
    const result = await query('Insert into JoinedEvents(UserId ,id) values (?,?)',[userId,id]);
    if(result.affectedRows==1){
      res.status(201).json({message:"ok"})
    }else{
      res.status(304).json({message:"Some Error Occured"})
    }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  GetJoinedEvents: async (req, res) => {
    const { id } = req.params; // userId
  
    try {
      const sql = `
        SELECT * 
        FROM Events 
        WHERE id IN (
          SELECT id 
          FROM JoinedEvents 
          WHERE userId = ?
        )
      `;
  
      const results = await query(sql, [id]);
  
      if (results.length > 0) {
        res.status(200).json({
          message: "ok",
          data: results,
        });
      } else {
        res.status(200).json({
          message: "No Events",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  LeaveJoinedEvents: async (req,res)=>{
    const {id} = req.params;
    try {
       const result = await query("delete from JoinedEvents where id = ?", [id]);
    if(result.affectedRows){
          res.status(200).json({message:"Successfully removed from Event"})
    }else{
      res.status(304).json({message:"An Error occured and could not removed from Event"})
    }
    } catch (error) {
      res.status(304).json({message:"An Error occured and could not removed from Event"})

    }
  }



};