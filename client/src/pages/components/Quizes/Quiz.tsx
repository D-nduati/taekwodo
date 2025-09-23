import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, Progress, Typography, notification, Spin, List, Row, Col, Tag, message } from 'antd';
import axios from 'axios';
import {LeftOutlined,RightOutlined, SendOutlined} from '@ant-design/icons'

const { Title, Text } = Typography;

interface QuizSummary {
  QuizID: number;
  Title: string;
  Category: string;
}

interface Question {
  questionID: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
}

interface QuizDetails {
  quizID: number;
  title: string;
  category: string;
  questions: Question[];
}

interface UserQuizProps {}

const UserQuiz: React.FC<UserQuizProps> = () => {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetails | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectingQuiz, setSelectingQuiz] = useState(true);
  const [loadingQuizDetails, setLoadingQuizDetails] = useState(false);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getAllQuizzes');
      setQuizzes(response.data);
    } catch (error) {
      notification.error({ message: 'Error loading available quizzes' });
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizDetails = async (quizId: number) => {
    setLoadingQuizDetails(true);
    try {
      const response = await axios.get(`http://localhost:5000/quiz/clientQuiz/${quizId}`);
      const quizData = response.data;
      
      // Transform the flat array into proper quiz structure
      if (Array.isArray(quizData) && quizData.length > 0) {
        const questionsMap = new Map();
        
        quizData.forEach(item => {
          if (!questionsMap.has(item.QuestionID)) {
            questionsMap.set(item.QuestionID, {
              questionID: item.QuestionID,
              questionText: item.QuestionText,
              correctAnswer: item.CorrectAnswer,
              options: []
            });
          }
          if (item.OptionText) {
            questionsMap.get(item.QuestionID).options.push(item.OptionText);
          }
        });
        
        const questions = Array.from(questionsMap.values());
        
        const formattedQuiz: QuizDetails = {
          quizID: quizData[0].QuizID,
          title: quizData[0].Title,
          category: quizData[0].Category,
          questions: questions
        };
        
        setSelectedQuiz(formattedQuiz);
        setSelectedAnswers(new Array(questions.length).fill(-1));
      } else {
        throw new Error('Invalid quiz data format');
      }
      
      setSelectingQuiz(false);
    } catch (error) {
      console.error('Error loading quiz details:', error);
      notification.error({ message: 'Error loading quiz details' });
    } finally {
      setLoadingQuizDetails(false);
    }
  };

  const handleQuizSelect = (quiz: QuizSummary) => {
    fetchQuizDetails(quiz.QuizID);
  };

  const handleBackToSelection = () => {
    setSelectedQuiz(null);
    setSelectingQuiz(true);
    setCurrentIndex(0);
    setSelectedAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    return selectedQuiz.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!selectedQuiz) return;
    
    const score = calculateScore();
    const userId = localStorage.getItem("userId");
    
    setSubmitting(true);
    try {
     const response=  await axios.post('http://localhost:5000/quiz/quiz/submit', {
        userId: userId ,
        quizID: selectedQuiz.quizID,
        score: score
      });
      if(response.status==200||response.status==201){
          notification.success({ 
        message: 'Quiz Submitted!', 
        description: `Your score: ${score}/${selectedQuiz.questions.length}` 
      });
      }
      else{
        message.info(response.message)
      }
    
      
      setTimeout(() => {
        handleBackToSelection();
      }, 3000);
    } catch (error) {
      notification.error({ message: 'Error submitting quiz' });
    } finally {
      setSubmitting(false);
    }
  };

  // Quiz Selection Screen
  if (selectingQuiz) {
    return (
      <Card title={<Title level={2}>Select a Quiz</Title>} style={{ maxWidth: 800, margin: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <Text style={{ display: 'block', marginTop: 16 }}>Loading available quizzes...</Text>
          </div>
        ) : (
          <>
            <Text>Choose from the available quizzes below to test your knowledge:</Text>
            <List
              style={{ marginTop: 20 }}
              dataSource={quizzes}
              renderItem={(quiz) => (
                <List.Item
                  actions={[
                    <Button 
                      type="primary" 
                      onClick={() => handleQuizSelect(quiz)}
                      loading={loadingQuizDetails}
                    >
                      Start Quiz
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={quiz.Title}
                    description={
                      <div>
                        <Tag color="blue">{quiz.Category}</Tag>
                        <Text type="secondary">Quiz ID: {quiz.QuizID}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: 'No quizzes available at the moment' }}
            />
          </>
        )}
      </Card>
    );
  }

  if (loadingQuizDetails) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <Text style={{ display: 'block', marginTop: 16 }}>Loading quiz...</Text>
      </div>
    );
  }

  if (!selectedQuiz || !selectedQuiz.questions || selectedQuiz.questions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Text>No questions found for this quiz.</Text>
        <Button onClick={handleBackToSelection} style={{ marginTop: 16 }}>
          Back to Quiz Selection
        </Button>
      </div>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / selectedQuiz.questions.length) * 100;
  const isLastQuestion = currentIndex === selectedQuiz.questions.length - 1;

  if (!currentQuestion) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Text>Error loading question.</Text>
        <Button onClick={handleBackToSelection} style={{ marginTop: 16 }}>
          Back to Quiz Selection
        </Button>
      </div>
    );
  }

  return (
    <Card 
      title={
        <div>
          <Title level={2} style={{ margin: 0 }}>{selectedQuiz.title}</Title>
          <Text type="secondary">Category: {selectedQuiz.category}</Text>
        </div>
      } 
      style={{ maxWidth: 800, margin: 'auto' }}
      extra={<Button onClick={handleBackToSelection}>Back to Quiz Selection</Button>}
    >
      <div style={{ marginBottom: 20 }}>
        <Progress percent={Math.round(progress)} />
        <Row justify="space-between" style={{ marginTop: 8 }}>
          <Text type="secondary">Question {currentIndex + 1} of {selectedQuiz.questions.length}</Text>
          <Text type="secondary">Score: {calculateScore()} / {selectedQuiz.questions.length}</Text>
        </Row>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Title level={4}>{currentQuestion.questionText}</Title>
        <Radio.Group
          value={selectedAnswers[currentIndex]}
          onChange={(e) => handleAnswerSelect(e.target.value)}
          style={{ display: 'block' }}
        >
          {currentQuestion.options && currentQuestion.options.map((option, index) => (
            <Radio 
              key={index} 
              value={index} 
              style={{ 
                display: 'block', 
                margin: '12px 0', 
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                backgroundColor: selectedAnswers[currentIndex] === index ? '#f0f8ff' : 'white'
              }}
            >
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button type='primary' size='small'icon={<LeftOutlined />} shape='round' onClick={handlePrevious} disabled={currentIndex === 0} style={{ marginRight: 8 }}>
            Previous
          </Button>
          <Button  size='small' shape="round" onClick={handleBackToSelection} type="text">Quit Quiz</Button>
        </div>
        
        {isLastQuestion ? (
          <Button
          size="small" 
            type="primary" 
            onClick={handleSubmit}
            disabled={selectedAnswers[currentIndex] === -1}
            loading={submitting}
            icon={<SendOutlined  style={{transform:`rotate(90)`}}/>}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={handleNext}
            disabled={selectedAnswers[currentIndex] === -1}
            size="small"
            icon={<RightOutlined />}
          >
            Next Question
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserQuiz;