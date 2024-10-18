import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, Progress, Typography, notification } from 'antd';
import axios from 'axios';

const { Text } = Typography;

interface Question {
  questionID: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  quizID: number;
  title: string;
  category: string;
  questions: Question[];
}

interface UserQuizProps {
  userID: number;
  quizID: number; // Can be selected by user from available quizzes or passed down
}

const UserQuiz: React.FC<UserQuizProps> = ({ userID, quizID }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz/clientQuiz/${quizID}`);
        const quizData = response.data;
        const formattedQuiz: Quiz = {
          quizID: quizData[0].QuizID,
          title: quizData[0].Title,
          category: quizData[0].Category,
          questions: quizData.reduce((acc: any[], cur: any) => {
            let question = acc.find(q => q.questionID === cur.QuestionID);
            if (!question) {
              question = {
                questionID: cur.QuestionID,
                questionText: cur.QuestionText,
                options: [cur.OptionText],
                correctAnswer: cur.CorrectAnswer
              };
              acc.push(question);
            } else {
              question.options.push(cur.OptionText);
            }
            return acc;
          }, [])
        };
        setQuiz(formattedQuiz);
      } catch (error) {
        notification.error({ message: 'Error fetching quiz' });
      }
    };
    fetchQuiz();
  }, [quizID]);

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      await axios.post('http://localhost:5000/quiz/quiz/submit', {
        userID,
        quizID: quiz?.quizID,
        score,
      });
      notification.success({ message: 'Quiz submitted successfully!' });
    } catch (error) {
      notification.error({ message: 'Error submitting quiz' });
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <Card title="Quiz Completed">
        <Text>Your score: {score} / {quiz.questions.length}</Text>
        <Button type="primary" onClick={handleSubmitQuiz} style={{ marginTop: '20px' }}>
          Submit Quiz
        </Button>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card title={quiz.title} style={{ maxWidth: 800, margin: 'auto' }}>
      <Progress percent={progress} />
      <Text strong>{currentQuestion.questionText}</Text>
      <Radio.Group
        onChange={(e) => handleAnswerSelection(e.target.value)}
        value={selectedAnswer}
        style={{ display: 'block', marginTop: '20px' }}
      >
        {currentQuestion.options.map((option, index) => (
          <Radio key={index} value={index} style={{ display: 'block', margin: '10px 0' }}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <Button
        type="primary"
        disabled={selectedAnswer === null}
        onClick={handleNextQuestion}
        style={{ marginTop: '20px' }}
      >
        {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </Button>
    </Card>
  );
};

export default UserQuiz;
