
import React, { useState } from 'react';
import { Card, Button, Col, Row, Typography, Modal, Input, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const pricingData = [
  {
    title: 'Free Tier',
    price: 'KES 0',
    description: 'Access basic training resources and get started with Taekwondo fundamentals.',
    features: ['Basic Training Videos', 'Community Access', 'No Certification'],
    backgroundColor: '#FFDEE9',
    borderColor: '#D4A5A5',
  },
  {
    title: 'Bronze Plan',
    price: 'KES 500',
    description: 'Become certified and access more advanced training resources.',
    features: ['Advanced Videos', 'Exclusive Webinars', 'Bronze Certification'],
    backgroundColor: '#D4FC79',
    borderColor: '#96E6A1',
  },
  {
    title: 'Silver Plan',
    price: 'KES 1000',
    description: 'Get exclusive access to live training sessions and silver certification.',
    features: ['Live Training Sessions', 'Personalized Feedback', 'Silver Certification'],
    backgroundColor: '#B6CEE8',
    borderColor: '#719ECE',
  },
  {
    title: 'Gold Plan',
    price: 'KES 2000',
    description: 'Access elite-level resources and achieve gold certification for mastery.',
    features: ['Elite Training', '1-on-1 Coaching', 'Gold Certification'],
    backgroundColor: '#FBD786',
    borderColor: '#F7797D',
  },
];

const PricingComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePaymentClick = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!phoneNumber) {
      message.error('Please enter a valid phone number!');
    } else if (phoneNumber.length < 9 || phoneNumber.length > 10) {
      message.error('Phone number must be at least 10 digits long!');
    } else {
      const selectedPlanData = pricingData.find(plan => plan.title === selectedPlan);
      const amount = selectedPlanData ? parseInt(selectedPlanData.price.replace('KES ', '')) : 0;
  
      try {
        const response = await fetch('http://localhost:5000/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            phone: phoneNumber,
          }),
        });
  
        if (response.ok) {
          message.success(`Payment initiated for the ${selectedPlan}. Thank you!`);
          setIsModalVisible(false);
          setPhoneNumber('');
        } else {
          const errorData = await response.json();
          message.error(`Payment failed: ${errorData.message}`);
        }
      } catch (error:any) {
        message.error(`Error initiating payment: ${error.message}`);
      }
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
        {pricingData.map((plan, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              title={<Title level={3} style={{ color: '#333' }}>{plan.title}</Title>}
              bordered={false}
              style={{
                background: `linear-gradient(135deg, ${plan.backgroundColor} 30%, ${plan.borderColor} 90%)`,
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
              }}
              hoverable
            >
              <Title level={2} style={{ color: '#222' }}>{plan.price}</Title>
              <Text style={{ display: 'block', marginBottom: '10px' }}>{plan.description}</Text>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ margin: '10px 0', color: '#555' }}>
                    <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <Text>{feature}</Text>
                  </li>
                ))}
              </ul>
              <Button
                type="primary"
                block
                onClick={() => handlePaymentClick(plan.title)}
                style={{
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  height: '50px',
                  fontSize: '16px',
                }}
              >
                Pay with MPesa
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Make Payment"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Proceed"
      >
        <p>Please enter your phone number to complete the payment for the {selectedPlan}.</p>
        <Input
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default PricingComponent;


