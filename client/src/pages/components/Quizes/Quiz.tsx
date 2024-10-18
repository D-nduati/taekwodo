import React, { useState, useEffect } from 'react';
import { Button, Progress, Card, Row, Col, Typography, notification } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

const { Text } = Typography;

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  // ... your quizQuestions data here
];

const TaekwondoQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answersSummary, setAnswersSummary] = useState<
    { question: string; correct: boolean }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const totalQuestions = quizQuestions.length;

  // User and quiz IDs - these would typically come from props or state
  const userID = '4';  // Replace with actual user ID
  const quizID = '';  // Replace with actual quiz ID

  // Handle submitting quiz result to the server
  const submitQuizResult = async (score: number) => {
    try {
      await axios.post('/api/submitQuizResult', { userID, quizID, score });
      notification.success({
        message: 'Quiz Submitted!',
        description: `Your score of ${score} has been submitted.`,
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: 'Submission Failed',
        description: 'Failed to submit your quiz result. Please try again.',
        duration: 2,
      });
    }
  };


  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswersSummary((prev) => [
      ...prev,
      {
        question: quizQuestions[currentQuestion].question,
        correct: isCorrect,
      },
    ]);

    notification[isCorrect ? 'success' : 'error']({
      message: isCorrect ? 'Correct!' : 'Wrong Answer!',
      description: isCorrect
        ? 'You got it right!'
        : `The correct answer was: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}`,
      duration: 2,
    });

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        submitQuizResult(score); 
      }
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      {quizCompleted ? (
        <Card title="Quiz Summary" bordered={false} style={{ textAlign: 'center' }}>
          <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>
            Your Score: {score} / {totalQuestions}
          </Text>
          <div style={{ marginTop: '20px' }}>
            {answersSummary.map((summary, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <Text>{index + 1}. {summary.question}</Text>
                <div>
                  {summary.correct ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginRight: 8 }} />
                  )}
                  <Text>{summary.correct ? 'Correct' : 'Wrong'}</Text>
                </div>
              </div>
            ))}
          </div>
          <Button type="primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
            Retake Quiz
          </Button>
        </Card>
      ) : (
        <>
          <Progress percent={(currentQuestion / totalQuestions) * 100} status="active" />
          <Card title={`Question ${currentQuestion + 1} of ${totalQuestions}`} bordered={false} style={{ marginTop: '20px', minHeight: '60vh' }}>
            <Text strong>{quizQuestions[currentQuestion].question}</Text>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Col span={12} key={index}>
                  <Button
                    block
                    type={selectedAnswer === index ? (index === quizQuestions[currentQuestion].correctAnswer ? 'primary' : 'default') : 'default'}
                    danger={selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer}
                    onClick={() => handleAnswerClick(index)}
                    style={{
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {option}
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default TaekwondoQuiz;
