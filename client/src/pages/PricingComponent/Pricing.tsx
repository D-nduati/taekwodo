import React from 'react';
import { Card, Button, Col, Row, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const pricingData = [
  {
    title: 'Basic Plan',
    price: 'KES 500',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    backgroundColor: '#FFDEE9',
    borderColor: '#D4A5A5',
  },
  {
    title: 'Standard Plan',
    price: 'KES 1000',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    backgroundColor: '#D4FC79',
    borderColor: '#96E6A1',
  },
  {
    title: 'Premium Plan',
    price: 'KES 2000',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    backgroundColor: '#B6CEE8',
    borderColor: '#719ECE',
  },
];

const PricingComponent: React.FC = () => {
  return (
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
  );
};

export default PricingComponent;
