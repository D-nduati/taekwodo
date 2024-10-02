import { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Typography, Button, Avatar, Image } from 'antd';
import { UserOutlined, CheckCircleOutlined, RocketOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'umi';


const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function Landing() {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    setWelcomeMessage('Welcome to Taekwondo Pro!');
  }, []);


  return (
    <Layout style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
          padding: '100px 50px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <Title style={{ fontSize: '48px', marginBottom: '20px' }}>Master Your Taekwondo Journey</Title>
        <Text style={{ fontSize: '18px', marginBottom: '20px', display: 'block' }}>
          Track your progress, learn new techniques, and stay connected with the Taekwondo community.
        </Text>
        <Button
          size="large"
          type="primary"
          style={{ backgroundColor: '#ff7f50', borderColor: '#ff7f50', marginTop: '20px' }}
        >
          Try For Free
        </Button>
      </div>

      {/* Features Section */}
      <Content style={{ padding: '50px', backgroundColor: '#f8fafc' }}>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <RocketOutlined style={{ fontSize: '48px', color: '#0072ff', marginBottom: '20px' }} />
              <Title level={3}>Track Your Progress</Title>
              <Paragraph>
                Monitor your belt level, skills, and achievements with our comprehensive tracking tools.
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CheckCircleOutlined style={{ fontSize: '48px', color: '#ff7f50', marginBottom: '20px' }} />
              <Title level={3}>Learn New Techniques</Title>
              <Paragraph>
                Access a library of instructional videos and tutorials from top Taekwondo masters.
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <StarOutlined style={{ fontSize: '48px', color: '#ffc107', marginBottom: '20px' }} />
              <Title level={3}>Connect with the Community</Title>
              <Paragraph>
                Join a vibrant community of practitioners, instructors, and enthusiasts from around the world.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <Title style={{ textAlign: 'center', margin: '50px 0 30px' }}>What Our Users Are Saying</Title>
        <Row gutter={[32, 32]} justify="center">
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '20px' }} />
              <Paragraph>"This app helped me achieve my Black Belt faster than I thought possible!"</Paragraph>
              <Text strong>- Sarah Kim</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: '#fff',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '20px' }} />
              <Paragraph>"The technique tutorials are a game changer. Highly recommend!"</Paragraph>
              <Text strong>- John Lee</Text>
            </Card>
          </Col>
        </Row>

        {/* Call to Action Section */}
        <div
          style={{
            background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
            padding: '50px',
            marginTop: '50px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Title style={{ color: '#fff', marginBottom: '20px' }}>Start Your Taekwondo Journey Today!</Title>
          <Link to ='/login'>
          <Button size="large" type="primary" style={{ backgroundColor: '#ff7f50', borderColor: '#ff7f50' }}>
            Sign Up Now
          </Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}

export default Landing;
