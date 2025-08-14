import React from 'react';
import styles from './HomePage.module.css';
import { Typography, Button, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CallToAction: React.FC = () => {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <Title level={2} className={styles.ctaTitle}>Ready to Begin Your Journey?</Title>
        <Paragraph className={styles.ctaText}>
          Join thousands of Taekwondo practitioners who are already improving their skills with our platform.
        </Paragraph>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            shape="round" 
            className={styles.primaryCta}
            icon={<ArrowRightOutlined />}
          >
            Start Free Trial
          </Button>
          <Button 
            size="large" 
            shape="round" 
            className={styles.secondaryCta}
          >
            Learn More
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CallToAction;