import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Card, Divider, Spin, Alert, Typography, Input, Button, Form, Layout, message } from 'antd';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

enum FormType {
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot_password',
}

function AuthForm() {
  const [formType, setFormType] = useState<FormType>(FormType.LOGIN);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      let url = '';

      switch (formType) {
        case FormType.LOGIN:
          url = 'http://localhost:4000/login';
          break;
        case FormType.SIGNUP:
          url = 'http://localhost:4000/signup';
          break;
        case FormType.FORGOT_PASSWORD:
          url = 'http://localhost:4000/forgot-password';
          break;
        default:
          throw new Error('Invalid form type');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          message.success(`${formType.charAt(0).toUpperCase() + formType.slice(1)} successful!`);
          redirect('/dashboard');
        } else {
          message.error(data.message || `${formType.charAt(0).toUpperCase() + formType.slice(1)} failed. Please try again.`);
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        message.error('Unexpected response from the server. Please try again.');
      }
    } catch (err) {
      message.error('Error posting form data. Please try again.');
      console.error('Error posting form data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    message.success("Logged out successfully");
    redirect('/login')
  };
  

  return (
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
      <animated.div style={fadeIn}>
        <Card
          style={{
            maxWidth: 400,
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            background: 'white',
          }}
        >
          <Typography>
            <Title style={{ color: '#ff7e5f', textAlign: 'center', whiteSpace: 'nowrap' }}>
              {formType === FormType.LOGIN ? 'Login' : formType === FormType.SIGNUP ? 'Sign Up' : 'Forgot Password'}
            </Title>
          </Typography>
          <Divider />
          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <Alert message="Error" description={error} type="error" showIcon />
          ) : (
            <Form layout="vertical" onFinish={handleFormSubmit}>
              {formType === FormType.SIGNUP && (
                <Form.Item>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter Your Username"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
                  />
                </Form.Item>
              )}
              <Form.Item>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
                />
              </Form.Item>
              {formType !== FormType.FORGOT_PASSWORD && (
                <Form.Item>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Your Password"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
                  />
                </Form.Item>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-hover"
                  style={{
                    backgroundColor: '#ff7e5f',
                    borderColor: '#ff7e5f',
                    padding: '0 30px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {formType === FormType.LOGIN ? 'Login' : formType === FormType.SIGNUP ? 'Sign Up' : 'Reset Password'}
                </Button>
                {formType === FormType.LOGIN && (
                  <>
                    <Button type="link" onClick={() => setFormType(FormType.FORGOT_PASSWORD)} style={{ color: '#ff7e5f' }}>
                      Forgot Password
                    </Button>
                    <Button type="link" onClick={() => setFormType(FormType.SIGNUP)} style={{ color: '#ff7e5f' }}>
                      Sign Up
                    </Button>
                  </>
                )}
                {formType === FormType.SIGNUP && (
                  <Button type="link" onClick={() => setFormType(FormType.LOGIN)} style={{ color: '#ff7e5f' }}>
                    Already have an account? Login
                  </Button>
                )}
                {formType === FormType.FORGOT_PASSWORD && (
                  <Button type="link" onClick={() => setFormType(FormType.LOGIN)} style={{ color: '#ff7e5f' }}>
                    Remembered your password? Login
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Card>
      </animated.div>
    </Content>
  );
}

export default AuthForm;
