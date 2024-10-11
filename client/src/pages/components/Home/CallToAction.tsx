import React from 'react';
import styles from './HomePage.module.css';

const CallToAction: React.FC = () => {
  return (
    <div className={styles['call-to-action']}>
      <h2>Ready to Get Started?</h2>
      <button>Good luck as you start Your Journey</button>
    </div>
  );
};

export default CallToAction;
