import React from 'react';
import styles from './HomePage.module.css';

const AboutTaekwondo: React.FC = () => {
  return (
    <div className={styles.container} >
      <h2>About Taekwondo</h2>
      <p>
        Taekwondo is a Korean martial art that emphasizes high, fast kicks and jumping techniques. It's more than
        just a sport—it's a way of life that promotes discipline, respect, and perseverance.
      </p>
      <p>
        Whether you're a beginner or an experienced martial artist, our app will guide you through your journey.
      </p>
    </div>
  );
};

export default AboutTaekwondo;
