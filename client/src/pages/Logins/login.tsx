import React, { useState } from 'react';
import { Card, Divider, Spin, Alert, Typography, Input, Button, Form, Layout, message } from 'antd';

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
    email: '', // For Sign Up and Forgot Password
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      // TO DO: Add form submission logic here
      message.success(`${formType.charAt(0).toUpperCase() + formType.slice(1)} successful!`);
    } catch (err) {
      message.error('Error posting form data. Please try again.');
      console.error('Error posting form data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Content>
      <Card>
        <Typography>
          <Title style={{ textWrap: 'nowrap' }}>
            {formType === FormType.LOGIN
              ? 'Login'
              : formType === FormType.SIGNUP
              ? 'Sign Up'
              : 'Forgot Password'}
          </Title>
        </Typography>
        <Divider />
        {loading ? (
          <Spin />
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <Form>
            {formType === FormType.SIGNUP && (
              <Form.Item>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Your Username"
                  style={{ width: 300, marginBottom: 16 }}
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
                style={{ width: 300, marginBottom: 16 }}
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
                  style={{ width: 300, marginBottom: 16 }}
                />
              </Form.Item>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', padding: '10px' }}>
              <Button type="primary" onClick={handleFormSubmit}>
                {formType === FormType.LOGIN
                  ? 'Login'
                  : formType === FormType.SIGNUP
                  ? 'Sign Up'
                  : 'Reset Password'}
              </Button>
              {formType === FormType.LOGIN && (
                <>
                  <Button type="default" onClick={() => setFormType(FormType.FORGOT_PASSWORD)}>
                    Forgot Password
                  </Button>
                  <Button type="link" onClick={() => setFormType(FormType.SIGNUP)}>
                    Sign Up
                  </Button>
                </>
              )}
              {formType === FormType.SIGNUP && (
                <Button type="link" onClick={() => setFormType(FormType.LOGIN)}>
                  Already have an account? Login
                </Button>
              )}
              {formType === FormType.FORGOT_PASSWORD && (
                <Button type="link" onClick={() => setFormType(FormType.LOGIN)}>
                  Remembered your password? Login
                </Button>
              )}
            </div>
          </Form>
        )}
      </Card>
    </Content>
  );
}

export default AuthForm;
// import React, { useEffect, useState } from 'react';
// import { Card, Divider, Spin, Alert, Typography, Input, Button, Form, Layout, message } from 'antd';

// const { Content } = Layout;
// const { Title } = Typography;

// enum FormType {
//   LOGIN = 'login',
//   SIGNUP = 'signup',
//   FORGOT_PASSWORD = 'forgot_password',
// }

// function AuthForm() {
//   const [formType, setFormType] = useState<FormType>(FormType.LOGIN);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '', // For Sign Up and Forgot Password
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (formType === FormType.LOGIN) {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch('some-url'); // Replace with your actual URL
//           if (response.ok) {
//             const data = await response.json();
//             setFormData((prevState) => ({
//               ...prevState,
//               ...data,
//             }));
//           } else {
//             setError('Failed to load data');
//             message.error('Failed to load data');
//           }
//         } catch (err: any) {
//           setError(err.message);
//           console.log(err);
//           message.error('An error occurred while fetching data.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }
//   }, [formType]);

//   const handleFormSubmit = async () => {
//     try {
//       setLoading(true);
//       let url = '';
  
//       // switch (formType) {
//       //   case FormType.LOGIN:
//       //     url = 'http://localhost:4000/login';
//       //     break;
//       //   case FormType.SIGNUP:
//       //     url = 'http://localhost:4000/signup';
//       //     break;
//       //   case FormType.FORGOT_PASSWORD:
//       //     url = 'http://localhost:4000/forgot-password';
//       //     break;
//       //   default:
//       //     throw new Error('Invalid form type');
//       // }
  
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const contentType = response.headers.get('Content-Type');
//       if (contentType && contentType.includes('application/json')) {
//         const data = await response.json();
//         if (response.ok) {
//           message.success(`${formType.charAt(0).toUpperCase() + formType.slice(1)} successful!`);
//         } else {
//           message.error(data.message || `${formType.charAt(0).toUpperCase() + formType.slice(1)} failed. Please try again.`);
//         }
//       } else {
//         const errorText = await response.text(); // Read the text of the HTML error
//         console.error('Error response:', errorText);
//         message.error('Unexpected response from the server. Please try again.');
//       }
//     } catch (err) {
//       message.error('Error posting form data. Please try again.');
//       console.error('Error posting form data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <Content>
//       <Card>
//         <Typography>
//           <Title style={{ textWrap: 'nowrap' }}>
//             {formType === FormType.LOGIN
//               ? 'Login'
//               : formType === FormType.SIGNUP
//               ? 'Sign Up'
//               : 'Forgot Password'}
//           </Title>
//         </Typography>
//         <Divider />
//         {loading ? (
//           <Spin />
//         ) : error ? (
//           <Alert message="Error" description={error} type="error" showIcon />
//         ) : (
//           <Form>
//             {formType === FormType.SIGNUP && (
//               <Form.Item>
//                 <Input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   placeholder="Enter Your Username"
//                   style={{ width: 300, marginBottom: 16 }}
//                 />
//               </Form.Item>
//             )}
//             <Form.Item>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter Your Email"
//                 style={{ width: 300, marginBottom: 16 }}
//               />
//             </Form.Item>
//             {formType !== FormType.FORGOT_PASSWORD && (
//               <Form.Item>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Enter Your Password"
//                   style={{ width: 300, marginBottom: 16 }}
//                 />
//               </Form.Item>
//             )}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', padding: '10px' }}>
//               <Button type="primary" onClick={handleFormSubmit}>
//                 {formType === FormType.LOGIN
//                   ? 'Login'
//                   : formType === FormType.SIGNUP
//                   ? 'Sign Up'
//                   : 'Reset Password'}
//               </Button>
//               {formType === FormType.LOGIN && (
//                 <>
//                   <Button type="default" onClick={() => setFormType(FormType.FORGOT_PASSWORD)}>
//                     Forgot Password
//                   </Button>
//                   <Button type="link" onClick={() => setFormType(FormType.SIGNUP)}>
//                     Sign Up
//                   </Button>
//                 </>
//               )}
//               {formType === FormType.SIGNUP && (
//                 <Button type="link" onClick={() => setFormType(FormType.LOGIN)}>
//                   Already have an account? Login
//                 </Button>
//               )}
//               {formType === FormType.FORGOT_PASSWORD && (
//                 <Button type="link" onClick={() => setFormType(FormType.LOGIN)}>
//                   Remembered your password? Login
//                 </Button>
//               )}
//             </div>
//           </Form>
//         )}
//       </Card>
//     </Content>
//   );
// }

// export default AuthForm;
