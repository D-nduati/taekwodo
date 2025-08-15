import React from 'react';
import styles from './HomePage.module.css';
import { Button, Typography, Space, Image } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

import Img1 from '../Assets/her.png';
import Img2 from '../Assets/challenge2.png';
import Img3 from '../Assets/challenge269.png';

const { Title, Paragraph } = Typography;

const Hero: React.FC = () => {
 

  return (
    <div className={styles.heroContainer}>
      <Carousel autoplay effect="fade" className={styles.carousel}>
        <div className={styles.carouselSlide}>
          <img src={Img1} className={styles.carouselImage} />
          <div className={styles.carouselOverlay}>
            <Title level={1} className={styles.heroTitle}>
              Master the Art of Discipline
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              Track your progress, learn new techniques, and join our vibrant
              Taekwondo community
            </Paragraph>
            <Space>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className={styles.ctaButton}
              >
                Start Training
              </Button>
              <Button size="large" className={styles.secondaryButton}>
                Learn More
              </Button>
            </Space>
          </div>
        </div>
        <div className={styles.carouselSlide}>
          <img src={Img2} className={styles.carouselImage} />
          <div className={styles.carouselOverlay}>
            <Title level={1} className={styles.heroTitle}>
              Compete with Confidence
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              Track your progress, learn new techniques, and join our vibrant
              Taekwondo community
            </Paragraph>
            <Space>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className={styles.ctaButton}
              >
                Start Training
              </Button>
              <Button size="large" className={styles.secondaryButton}>
                Learn More
              </Button>
            </Space>
          </div>
        </div>
        <div className={styles.carouselSlide}>
          <img src={Img3} className={styles.carouselImage} />
          <div className={styles.carouselOverlay}>

          <Title level={1} className={styles.heroTitle}>
            Train Like a Champion
          </Title>
          <Paragraph className={styles.heroSubtitle}>
            Track your progress, learn new techniques, and join our vibrant
            Taekwondo community
          </Paragraph>
          <Space>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className={styles.ctaButton}
            >
              Start Training
            </Button>
            <Button size="large" className={styles.secondaryButton}>
              Learn More
            </Button>
          </Space>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default Hero;
