import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AboutTaekwondo from './AboutTaekwondo';
import CallToAction from './CallToAction';
import Testimonials from './Testimonials';
import './HomePage.module.css';
import { Layout } from 'antd';

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout style={{ background: '#f8fafc' }}>
      <Content>
        <Hero />
        <AboutTaekwondo />
        <Features />
        <Testimonials />
        <CallToAction />
      </Content>
    </Layout>
  );
};

;
export default Home;