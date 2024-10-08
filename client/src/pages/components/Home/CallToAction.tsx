import React from 'react';
import styles from '../styles/HomePage.module.css';

const CallToAction: React.FC = () => {
  return (
    <div className={styles['call-to-action']}>
      <h2>Ready to Get Started?</h2>
      <button onClick={() => alert('Get Started Now!')}>Start Your Journey</button>
    </div>
  );
};

export default CallToAction;
