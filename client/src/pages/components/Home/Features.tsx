import React from 'react';
import styles from '../styles/HomePage.module.css';

const Features: React.FC = () => {
  return (
    <div className={styles.features}>
      <h2>App Features</h2>
      <div className={styles['feature-item']}>
        <p><strong>Training Modules:</strong> Step-by-step guidance on taekwondo techniques for all levels.</p>
      </div>
      <div className={styles['feature-item']}>
        <p><strong>Progress Tracking:</strong> Monitor your advancement with detailed stats and achievements.</p>
      </div>
      <div className={styles['feature-item']}>
        <p><strong>Competitions:</strong> Participate in online and real-life tournaments. Earn rewards!</p>
      </div>
    </div>
  );
};

export default Features;
