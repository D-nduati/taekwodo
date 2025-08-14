import React from 'react';
import styles from './HomePage.module.css';
import { Typography, Card, Avatar, Row, Col } from 'antd';
import { MutedOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const testimonials = [
  {
    name: "Sarah Kim",
    role: "2nd Dan Black Belt",
    content: "This platform helped me refine my techniques and prepare for my black belt test with confidence.",
    avatar: "/avatar1.jpg"
  },
  {
    name: "Michael Johnson",
    role: "Instructor",
    content: "As a teacher, I've found the progress tracking tools invaluable for monitoring my students' development.",
    avatar: "/avatar2.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Competitor",
    content: "The competition preparation modules gave me the edge I needed to win my first tournament.",
    avatar: "/avatar3.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className={styles.testimonialsContainer}>
      <Title level={2} className={styles.sectionTitle}>What Our Community Says</Title>
      <Paragraph className={styles.sectionSubtitle}>
        Hear from practitioners who've transformed their Taekwondo journey
      </Paragraph>
      
      <Row gutter={[24, 24]} className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <Col xs={24} md={8} key={index}>
            <Card className={styles.testimonialCard}>
              <MutedOutlined className={styles.quoteIcon} />
              <Paragraph className={styles.testimonialText}>
                {testimonial.content}
              </Paragraph>
              <div className={styles.testimonialAuthor}>
                <Avatar src={testimonial.avatar} size={64} />
                <div className={styles.authorInfo}>
                  <Paragraph strong className={styles.authorName}>
                    {testimonial.name}
                  </Paragraph>
                  <Paragraph className={styles.authorRole}>
                    {testimonial.role}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;