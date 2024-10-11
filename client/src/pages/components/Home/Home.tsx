import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AboutTaekwondo from './AboutTaekwondo';
import CallToAction from './CallToAction';
import './HomePage.module.css'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutTaekwondo />
      <Features />
      <CallToAction />
    </>
  );
};

export default Home;
