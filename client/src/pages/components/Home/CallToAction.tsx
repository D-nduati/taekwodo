import React from 'react';
import styles from './HomePage.module.css';
import { Button } from 'antd';

const CallToAction: React.FC = () => {
  return (
    <div className={styles['call-to-action']}>
      <h2>Ready to Get Started?</h2>
      <Button
        type="primary"
        size="large"
        style={{ backgroundColor: '#ff9933', border: 'none' }}
      >
        Start Your Journey
      </Button>
    </div>
  );
};

export default CallToAction;
