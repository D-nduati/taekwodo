import React from 'react';
import styles from './HomePage.module.css';
import { Typography } from 'antd';
import { LineChartOutlined, TrophyOutlined, ReadOutlined } from '@ant-design/icons';

const Features: React.FC = () => {
  return (
    <div className={styles.features}>
      <Typography.Title level={2}>App Features</Typography.Title>
      <Typography.Paragraph>
        Step-by-step guidance on taekwondo techniques for all levels.
      </Typography.Paragraph>
      <div className={styles['feature-item']}>
  <ReadOutlined style={{ marginRight: 8, color: '#1890ff' }} />
  <strong>Training Modules:</strong> Step-by-step guidance...
</div>

      <div className={styles['feature-item']}>
        <p>
          <strong>Progress Tracking:</strong> Monitor your advancement with
          detailed stats and achievements.
        </p>
      </div>
      <div className={styles['feature-item']}>
        <p>
          <strong>Competitions:</strong> Participate in online and real-life
          tournaments. Earn rewards!
        </p>
      </div>
    </div>
  );
};

export default Features;
