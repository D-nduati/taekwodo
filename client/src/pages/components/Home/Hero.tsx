import React from 'react';
import styles from './HomePage.module.css';
import { Button, Typography, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

const { Title, Paragraph } = Typography;

const Hero: React.FC = () => {
  const carouselContent = [
    {
      image: '../../../../assets/herotaekwondo.jpeg',
      alt: 'Taekwondo master performing kick',
      overlayText: 'Master the Art of Discipline'
    },
    {
      image: '../../../../assets/challenge.jpeg',
      alt: 'Taekwondo competition',
      overlayText: 'Compete with Confidence'
    },
    {
      image: '../../../../assets/challenge2.jpeg',
      alt: 'Taekwondo training',
      overlayText: 'Train Like a Champion'
    }
  ];

  return (
    <div className={styles.heroContainer}>
      <Carousel autoplay effect="fade" className={styles.carousel}>
        {carouselContent.map((item, index) => (
          <div key={index} className={styles.carouselSlide}>
            <img 
              src={item.image} 
              alt={item.alt} 
              className={styles.carouselImage}
            />
            <div className={styles.carouselOverlay}>
              <Title level={1} className={styles.heroTitle}>{item.overlayText}</Title>
              <Paragraph className={styles.heroSubtitle}>
                Track your progress, learn new techniques, and join our vibrant Taekwondo community
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
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;