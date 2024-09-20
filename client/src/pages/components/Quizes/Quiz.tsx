import React, { useState } from 'react';
import {
  Button,
  Progress,
  Card,
  Row,
  Col,
  Typography,
  notification,
} from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Text } = Typography;

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  {
    question: 'What does the word "Taekwondo" mean?',
    options: [
      'Hand techniques',
      'Foot techniques',
      'Way of the hand and foot',
      'Martial arts',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Which belt comes after the yellow belt in Taekwondo?',
    options: ['Green', 'Blue', 'Red', 'White'],
    correctAnswer: 0,
  },
  {
    question: 'What is the primary goal of Taekwondo training?',
    options: [
      'Physical fitness',
      'Self-defense',
      'Mental discipline',
      'All of the above',
    ],
    correctAnswer: 3,
  },
  {
    question: 'In Taekwondo, what is a "dojang"?',
    options: [
      'A place for sparring',
      'A form of belt',
      'A training hall',
      'A type of kick',
    ],
    correctAnswer: 2,
  },
  {
    question: 'What is the highest belt in Taekwondo?',
    options: ['Black', 'Red', 'Green', 'Blue'],
    correctAnswer: 0,
  },
  {
    question: 'Which of these is a common Taekwondo stance?',
    options: ['Fighting stance', 'Tiger stance', 'Horse stance', 'Dragon stance'],
    correctAnswer: 2,
  },
  {
    question: 'Which of the following is a basic Taekwondo kick?',
    options: [
      'Roundhouse kick',
      'Side kick',
      'Front kick',
      'All of the above',
    ],
    correctAnswer: 3,
  },
  {
    question: 'In Taekwondo competitions, what is the main area of focus for scoring?',
    options: ['Punching', 'Kicking', 'Blocking', 'Stances'],
    correctAnswer: 1,
  },
  {
    question: 'What is the Korean term for "attention" in Taekwondo?',
    options: ['Charyot', 'Kyungnet', 'Joonbi', 'Kihap'],
    correctAnswer: 0,
  },
  {
    question: 'What is the purpose of the Taekwondo "ki-hap"?',
    options: [
      'To scare the opponent',
      'To focus energy',
      'To breathe properly',
      'To intimidate the judge',
    ],
    correctAnswer: 1,
  },
  {
    question: 'What does "tae" represent in Taekwondo?',
    options: [
      'Mind',
      'Hand',
      'Foot',
      'Spirit',
    ],
    correctAnswer: 2,
  },
  {
    question: 'What does "kwon" represent in Taekwondo?',
    options: [
      'Mind',
      'Spirit',
      'Hand',
      'Foot',
    ],
    correctAnswer: 2,
  },
  {
    question: 'What is the Korean word for "form" or "pattern" in Taekwondo?',
    options: ['Kumite', 'Kata', 'Poomsae', 'Hyung'],
    correctAnswer: 2,
  },
  {
    question: 'How many basic forms (poomsae) are there in Taekwondo?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 2,
  },
  {
    question: 'In Taekwondo, what does "dan" represent?',
    options: ['A form of punch', 'A kick', 'A rank or degree', 'A training technique'],
    correctAnswer: 2,
  },
  {
    question: 'What is the meaning of the black belt in Taekwondo?',
    options: [
      'Mastery of basic techniques',
      'Completion of training',
      'End of the journey',
      'Start of a new journey and mastery of techniques',
    ],
    correctAnswer: 3,
  },
  {
    question: 'Which of the following is a tenet of Taekwondo?',
    options: [
      'Perseverance',
      'Self-control',
      'Courtesy',
      'All of the above',
    ],
    correctAnswer: 3,
  }
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
          <Card title={`Question ${currentQuestion + 1} of ${totalQuestions}`} bordered={false} style={{ marginTop: '20px', minHeight:'60vh'}}>
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
