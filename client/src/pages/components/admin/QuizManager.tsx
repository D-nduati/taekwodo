import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Card, List } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface Quiz {
  QuizID: number;
  Title: string;
  Category: string;
  CreatedAt: string;
}

interface Question {
  QuestionID: number;
  QuizID: number;
  QuestionText: string;
  CorrectAnswer: number;
}

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [form] = Form.useForm();

 
  useEffect(() => {
    axios.get('/api/quizzes')
      .then((res) => setQuizzes(res.data))
      .catch((err) => message.error('Failed to fetch quizzes'));
  }, []);

  const onFinish = (values: any) => {
    axios.post('/api/quizzes', values)
      .then((res) => {
        setQuizzes([...quizzes, res.data]);
        message.success('Quiz created successfully');
      })
      .catch((err) => message.error('Failed to create quiz'));
  };

  const handleAddQuestion = (values: any) => {
    axios.post(`/api/quizzes/${values.quizId}/questions`, values)
      .then(() => {
        message.success('Question added successfully');
      })
      .catch((err) => message.error('Failed to add question'));
  };

  return (
    <div>
      <Card title="Create New Quiz">
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="category" label="Category">
            <Select>
              <Option value="Beginner">Beginner</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Advanced">Advanced</Option>
            </Select>
          </Form.Item>

          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Create Quiz</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Add Questions">
        <Form form={form} onFinish={handleAddQuestion}>
          <Form.Item name="quizId" label="Quiz">
            <Select>
              {quizzes.map(quiz => (
                <Option value={quiz.QuizID} key={quiz.QuizID}>{quiz.Title}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="questionText" label="Question">
            <Input />
          </Form.Item>

          <Form.Item name="correctAnswer" label="Correct Answer (Index)">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="options" label="Options (Comma-separated)">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Add Question</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Quizzes">
        <List
          dataSource={quizzes}
          renderItem={quiz => (
            <List.Item>{quiz.Title}</List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default QuizManager;
