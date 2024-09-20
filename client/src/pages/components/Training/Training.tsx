import React from 'react';
import { List, Card, Calendar, Layout, Typography, Row, Col, Avatar, Tooltip } from 'antd';
import { FireOutlined, ThunderboltOutlined, HeartOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text,Paragraph } = Typography;

const trainingData = [
  { date: '2024-09-10', type: 'Sparring', icon: <FireOutlined style={{ color: '#ff4d4f' }} /> },
  { date: '2024-09-12', type: 'Forms', icon: <ThunderboltOutlined style={{ color: '#1890ff' }} /> },
  { date: '2024-09-15', type: 'Conditioning', icon: <HeartOutlined style={{ color: '#52c41a' }} /> },
];

const motivationalQuotes = [
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don’t limit your challenges. Challenge your limits.",
  "Push yourself, because no one else is going to do it for you.",
];

const Training = () => {
  return (
    <Layout style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '50px 20px' }}>
      <Content style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Title */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#001529' }}>
          Upcoming Taekwondo Training Sessions
        </Title>

        <Row gutter={32}>
          {/* Training List */}
          <Col xs={24} md={12}>
            <Card
              title="Training Schedule"
              bordered={false}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={trainingData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={item.icon} />}
                      title={<Text strong>{`Date: ${item.date}`}</Text>}
                      description={<Text>{`Training Type: ${item.type}`}</Text>}
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Motivational Quotes Section */}
            <Card
              title="Motivational Quotes"
              bordered={false}
              style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {motivationalQuotes.map((quote, index) => (
                <Text
                  key={index}
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontStyle: 'italic',
                    color: '#001529',
                  }}
                >
                  {`"${quote}"`}
                </Text>
              ))}
            </Card>
          </Col>

          {/* Training Calendar */}
          <Col xs={24} md={12}>
            <Card
              title="Training Calendar"
              bordered={false}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Calendar fullscreen={false} style={{ borderRadius: '12px' }} />
            </Card>
          </Col>
        </Row>

        {/* Preparation Tips Section */}
        <Title
          level={3}
          style={{ marginTop: '50px', textAlign: 'center', color: '#001529', fontWeight: 'bold' }}
        >
          Preparation Tips for Your Next Session
        </Title>
        <Row gutter={[32, 32]} justify="center" style={{ marginTop: '20px' }}>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#e6f7ff',
                textAlign: 'center',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tooltip title="Stay Hydrated" color="#1890ff">
                <ThunderboltOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
              </Tooltip>
              <Text style={{ display: 'block', marginTop: '10px' }}>Stay Hydrated</Text>
              <Paragraph>
                Keep yourself hydrated before, during, and after training. Water fuels your muscles and keeps you
                energized.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff1f0',
                textAlign: 'center',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tooltip title="Stretch and Warm-Up" color="#ff4d4f">
                <FireOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
              </Tooltip>
              <Text style={{ display: 'block', marginTop: '10px' }}>Stretch & Warm-Up</Text>
              <Paragraph>
                Properly warm up your body before engaging in intense training to prevent injuries and improve
                performance.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#f6ffed',
                textAlign: 'center',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tooltip title="Focus on Technique" color="#52c41a">
                <HeartOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
              </Tooltip>
              <Text style={{ display: 'block', marginTop: '10px' }}>Focus on Technique</Text>
              <Paragraph>
                Always pay attention to your form and technique during training. Precision leads to mastery.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Training;
