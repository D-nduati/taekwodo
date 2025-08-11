import React from 'react';
import styles from './HomePage.module.css';
import Logo from '../../../../assets/herotaekwondo.jpg';
import Challenge from "../../../../assets/challenge.jpg";
import Challenge2 from "../../../../assets/challenge2.jpg";

import { Carousel } from 'antd';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero} style={{ height: '60vh' }}>
      <div className={styles['hero-text']}>
        <h2>Welcome to Taekwondo World</h2>
        <p>
          Unleash your inner warrior. Train, compete, and track your progress in
          our vibrant community.
        </p>
      </div>
      <Carousel autoplay adaptiveHeight fade speed={500}>
        <div className="contentStyle">
          <img key="1" src={Logo} alt="Taekwondo" />
        </div>
        <div className="contentStyle">
          <img key="2" src={Challenge} alt="Taekwondo" />
        </div>
        <div className="contentStyle">
          <img key="3" src={Challenge2} alt="Taekwondo" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
