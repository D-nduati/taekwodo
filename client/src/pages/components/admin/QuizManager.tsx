// import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, Select, message, Card, List } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// interface Quiz {
//   QuizID: number;
//   Title: string;
//   Category: string;
//   CreatedAt: string;
// }

// interface Question {
//   QuestionID: number;
//   QuizID: number;
//   QuestionText: string;
//   CorrectAnswer: number;
// }

// const QuizManager: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [form] = Form.useForm();

 
//   useEffect(() => {
//     axios.get('/api/quizzes')
//       .then((res) => setQuizzes(res.data))
//       .catch((err) => message.error('Failed to fetch quizzes'));
//   }, []);

//   const onFinish = (values: any) => {
//     axios.post('/api/quizzes', values)
//       .then((res) => {
//         setQuizzes([...quizzes, res.data]);
//         message.success('Quiz created successfully');
//       })
//       .catch((err) => message.error('Failed to create quiz'));
//   };

//   const handleAddQuestion = (values: any) => {
//     axios.post(`/api/quizzes/${values.quizId}/questions`, values)
//       .then(() => {
//         message.success('Question added successfully');
//       })
//       .catch((err) => message.error('Failed to add question'));
//   };

//   return (
//     <div>
//       <Card title="Create New Quiz">
//         <Form form={form} onFinish={onFinish}>
//           <Form.Item name="category" label="Category">
//             <Select>
//               <Option value="Beginner">Beginner</Option>
//               <Option value="Intermediate">Intermediate</Option>
//               <Option value="Advanced">Advanced</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="title" label="Title">
//             <Input />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">Create Quiz</Button>
//           </Form.Item>
//         </Form>
//       </Card>

//       <Card title="Add Questions">
//         <Form form={form} onFinish={handleAddQuestion}>
//           <Form.Item name="quizId" label="Quiz">
//             <Select>
//               {quizzes.map(quiz => (
//                 <Option value={quiz.QuizID} key={quiz.QuizID}>{quiz.Title}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="questionText" label="Question">
//             <Input />
//           </Form.Item>

//           <Form.Item name="correctAnswer" label="Correct Answer (Index)">
//             <Input type="number" />
//           </Form.Item>

//           <Form.Item name="options" label="Options (Comma-separated)">
//             <Input />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">Add Question</Button>
//           </Form.Item>
//         </Form>
//       </Card>

//       <Card title="Quizzes">
//         <List
//           dataSource={quizzes}
//           renderItem={quiz => (
//             <List.Item>{quiz.Title}</List.Item>
//           )}
//         />
//       </Card>
//     </div>
//   );
// };

// export default QuizManager;



import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Space, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface Option {
  text: string;
}

const AdminQuiz: React.FC = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleOptionChange = (index: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index: number, value: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post('/api/admin/create-quiz', {
        category,
        title,
        questions,
      });
      notification.success({ message: 'Quiz Created Successfully!' });
      console.log('Quiz created:', response.data);
    } catch (error) {
      notification.error({ message: 'Error creating quiz!' });
    }
  };

  return (
    <Card title="Create Quiz" style={{ maxWidth: 800, margin: 'auto' }}>
      <Form layout="vertical" onFinish={handleSubmitQuiz}>
        <Form.Item label="Quiz Category">
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category" />
        </Form.Item>

        <Form.Item label="Quiz Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Quiz Title" />
        </Form.Item>

        <Card title="Questions" bordered={false}>
          {questions.map((q, index) => (
            <Card key={index} type="inner" style={{ marginBottom: 20 }}>
              <Form.Item label={`Question ${index + 1}`}>
                <Input
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder="Enter question"
                />
              </Form.Item>
              <Space direction="vertical">
                {q.options.map((option, optionIndex) => (
                  <Input
                    key={optionIndex}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}
              </Space>
              <Form.Item label="Correct Answer">
                <Select
                  value={q.correctAnswer}
                  onChange={(value) => handleCorrectAnswerChange(index, value)}
                >
                  {q.options.map((option, optionIndex) => (
                    <Option key={optionIndex} value={optionIndex}>
                      {`Option ${optionIndex + 1}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          ))}
          <Button type="dashed" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Quiz
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminQuiz;

