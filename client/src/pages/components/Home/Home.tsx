// import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AboutTaekwondo from './AboutTaekwondo';
import CallToAction from './CallToAction';
import './HomePage.module.css'

// const Home: React.FC = () => {
//   return (
//     <>
//       <Hero />
//       <AboutTaekwondo />
//       <Features />
//       <CallToAction />
//     </>
//   );
// };

// export default Home;
import { Layout } from 'antd';

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout>
      <Content>
        <Hero />
        <AboutTaekwondo />
        <Features />
        <CallToAction />
      </Content>
    </Layout>
  );
};

export default Home;
