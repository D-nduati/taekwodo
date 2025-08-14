import React from 'react';
import styles from './HomePage.module.css';
import { Typography, Row, Col, Card } from 'antd';
import { 
  LineChartOutlined, 
  TrophyOutlined, 
  ReadOutlined, 
  TeamOutlined,
  VideoCameraOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const featureItems = [
  {
    icon: <VideoCameraOutlined className={styles.featureIcon} />,
    title: "Comprehensive Tutorials",
    description: "Step-by-step video guidance on techniques for all belt levels."
  },
  {
    icon: <LineChartOutlined className={styles.featureIcon} />,
    title: "Progress Tracking",
    description: "Monitor your advancement with detailed stats and achievements."
  },
  {
    icon: <TrophyOutlined className={styles.featureIcon} />,
    title: "Competition Prep",
    description: "Specialized training modules for tournament preparation."
  },
  {
    icon: <ScheduleOutlined className={styles.featureIcon} />,
    title: "Personalized Training",
    description: "Custom workout plans tailored to your goals and schedule."
  },
  {
    icon: <ReadOutlined className={styles.featureIcon} />,
    title: "Learning Resources",
    description: "Access to manuals, forms, and Taekwondo philosophy."
  },
  {
    icon: <TeamOutlined className={styles.featureIcon} />,
    title: "Community Support",
    description: "Connect with instructors and fellow practitioners worldwide."
  }
];

const Features: React.FC = () => {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.sectionHeader}>
        <Title level={2} className={styles.sectionTitle}>App Features</Title>
        <Paragraph className={styles.sectionSubtitle}>
          Everything you need to excel in your Taekwondo journey
        </Paragraph>
      </div>
      
      <Row gutter={[24, 24]} className={styles.featuresGrid}>
        {featureItems.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className={styles.featureCard} hoverable>
              <div className={styles.featureIconContainer}>
                {feature.icon}
              </div>
              <Title level={4} className={styles.featureTitle}>{feature.title}</Title>
              <Paragraph className={styles.featureDescription}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Features;