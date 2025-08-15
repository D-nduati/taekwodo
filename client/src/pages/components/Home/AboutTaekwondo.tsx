import React from 'react';
import styles from './HomePage.module.css';
import { Typography, Row, Col, Image } from 'antd';

import taekwondoPattern from '../Assets/taekwondoPattern.png';

const { Title, Paragraph } = Typography;

const AboutTaekwondo: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <Row gutter={[48, 24]} align="middle">
        <Col xs={24} md={12}>
          <div className={styles.aboutContent}>
            <Title level={2} className={styles.sectionTitle}>The Art of Taekwondo</Title>
            <Paragraph className={styles.aboutText}>
              Taekwondo is a traditional Korean martial art that emphasizes high, fast kicks and jumping 
              techniques. More than just physical combat, it's a discipline that cultivates mental 
               strength, respect, and perseverance.
            </Paragraph>
            <Paragraph className={styles.aboutText}>
              Our platform is designed to support practitioners at every level, from white belt beginners 
              to black belt masters, providing structured learning paths and comprehensive resources.
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.aboutImageContainer}>
            <img
              src={taekwondoPattern}
              alt="Taekwondo patterns"
              // preview={false}
              className={styles.aboutImage}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutTaekwondo;