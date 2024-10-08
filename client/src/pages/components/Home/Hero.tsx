import React from 'react';
import styles from '../styles/HomePage.module.css';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-text']}>
        <h1>Welcome to Taekwondo World</h1>
        <p>Unleash your inner warrior. Train, compete, and track your progress in our vibrant community.</p>
      </div>
      <img src="/path-to-your-image/taekwondo-hero.png" alt="Taekwondo" />
    </div>
  );
};

export default Hero;
