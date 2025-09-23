// import React, { useState } from 'react';
// import { Form, Input, Button, Select, Card, Space, notification } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// interface Option {
//   text: string;
// }

// const AdminQuiz: React.FC = () => {
//   const [category, setCategory] = useState('');
//   const [title, setTitle] = useState('');
//   const [questions, setQuestions] = useState<any[]>([]);

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
//   };

//   const handleOptionChange = (index: number, optionIndex: number, value: string) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].options[optionIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionText = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectAnswerChange = (index: number, value: number) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].correctAnswer = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/admin/createQuiz', {
//         category,
//         title,
//         questions,
//       });
//       notification.success({ message: 'Quiz Created Successfully!' });
//       console.log('Quiz created:', response.data);
//     } catch (error) {
//       notification.error({ message: 'Error creating quiz!' });
//     }
//   };

//   return (
//     <Card title="Create Quiz" style={{ maxWidth: 800, margin: 'auto' }}>
//       <Form layout="vertical" onFinish={handleSubmitQuiz}>
//         <Form.Item label="Quiz Category">
//           <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category" />
//         </Form.Item>

//         <Form.Item label="Quiz Title">
//           <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Quiz Title" />
//         </Form.Item>

//         <Card title="Questions" bordered={false}>
//           {questions.map((q, index) => (
//             <Card key={index} type="inner" style={{ marginBottom: 20 }}>
//               <Form.Item label={`Question ${index + 1}`}>
//                 <Input
//                   value={q.questionText}
//                   onChange={(e) => handleQuestionChange(index, e.target.value)}
//                   placeholder="Enter question"
//                 />
//               </Form.Item>
//               <Space direction="vertical">
//                 {q.options.map((option, optionIndex) => (
//                   <Input
//                     key={optionIndex}
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
//                     placeholder={`Option ${optionIndex + 1}`}
//                   />
//                 ))}
//               </Space>
//               <Form.Item label="Correct Answer">
//                 <Select
//                   value={q.correctAnswer}
//                   onChange={(value) => handleCorrectAnswerChange(index, value)}
//                 >
//                   {q.options.map((option, optionIndex) => (
//                     <Option key={optionIndex} value={optionIndex}>
//                       {`Option ${optionIndex + 1}`}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Card>
//           ))}
//           <Button type="dashed" onClick={handleAddQuestion}>
//             Add Question
//           </Button>
//         </Card>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit Quiz
//           </Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// };

// export default AdminQuiz;
import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Space, notification, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const AdminQuiz: React.FC = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<Question[]>([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length > 2) {
      newQuestions[qIndex].options.splice(oIndex, 1);
      // Adjust correct answer if needed
      if (newQuestions[qIndex].correctAnswer >= oIndex) {
        newQuestions[qIndex].correctAnswer = Math.max(0, newQuestions[qIndex].correctAnswer - 1);
      }
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = async (values: { category: string; title: string }) => {
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        notification.error({ message: `Question ${i + 1} text is required` });
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        notification.error({ message: `All options for Question ${i + 1} are required` });
        return;
      }
      if (q.options.length < 2) {
        notification.error({ message: `Question ${i + 1} must have at least 2 options` });
        return;
      }
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/admin/createQuiz', {
        category: values.category,
        title: values.title,
        questions: questions
      });
      
      notification.success({ message: 'Quiz Created Successfully!' });
      form.resetFields();
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    } catch (error: any) {
      notification.error({ 
        message: 'Error creating quiz!', 
        description: error.response?.data?.error || 'Please try again' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Quiz" style={{ maxWidth: 800, margin: 'auto' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item 
          label="Quiz Category" 
          name="category"
          rules={[{ required: true, message: 'Please enter category' }]}
        >
          <Input placeholder="Enter Category" />
        </Form.Item>

        <Form.Item 
          label="Quiz Title" 
          name="title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input placeholder="Enter Quiz Title" />
        </Form.Item>

        <Card title={`Questions (${questions.length})`} bordered={false}>
          {questions.map((question, qIndex) => (
            <Card 
              key={qIndex} 
              type="inner" 
              style={{ marginBottom: 20 }}
              title={
                <Space>
                  Question {qIndex + 1}
                  {questions.length > 1 && (
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => removeQuestion(qIndex)}
                    />
                  )}
                </Space>
              }
            >
              <Form.Item label="Question Text">
                <TextArea
                  value={question.questionText}
                  onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                  placeholder="Enter question text"
                  rows={3}
                />
              </Form.Item>

              <Space direction="vertical" style={{ width: '100%' }}>
                <strong>Options:</strong>
                {question.options.map((option, oIndex) => (
                  <Space key={oIndex} style={{ width: '100%' }}>
                    <Input
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      style={{ width: '90%' }}
                    />
                    {question.options.length > 2 && (
                      <Button 
                        danger 
                        type="text" 
                        icon={<DeleteOutlined />}
                        onClick={() => removeOption(qIndex, oIndex)}
                      />
                    )}
                  </Space>
                ))}
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={() => addOption(qIndex)}
                >
                  Add Option
                </Button>
              </Space>

              <Form.Item label="Correct Answer" style={{ marginTop: 16 }}>
                <Select
                  value={question.correctAnswer}
                  onChange={(value) => updateQuestion(qIndex, 'correctAnswer', value)}
                >
                  {question.options.map((_, oIndex) => (
                    <Option key={oIndex} value={oIndex}>
                      Option {oIndex + 1}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          ))}
          
          <Button type="dashed" icon={<PlusOutlined />} onClick={addQuestion} block>
            Add Question
          </Button>
        </Card>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Quiz
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminQuiz;
