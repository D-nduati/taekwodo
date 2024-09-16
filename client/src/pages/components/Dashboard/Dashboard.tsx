
import React, { useState, useEffect } from 'react';
import { Layout,Menu } from 'antd';
import { HomeOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'umi'; 
import AppHeader from '../Header/Header';

const { Content, Footer, Header, Sider } = Layout;


interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user, children }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    setWelcomeMessage(`Welcome`);
  }, [user]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
   
      <Sider width={200} className="site-layout-sider" collapsible>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
           <Menu.Item key="1" icon={<HomeOutlined />}>
           <Link to='/home'>
           Home
           </Link>             
           </Menu.Item>
           <Menu.Item key="2" icon={<TeamOutlined />}>
           <Link to= '/members'>Members</Link>
            
           </Menu.Item>
           <Menu.Item key="3" icon={<SettingOutlined />}>
           <Link to='/settings'>Settings</Link>
           
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: '0', backgroundColor: '#fff' }}>
          <AppHeader />
        </Header>

       
        <Content style={{ padding: '50px' }}>
          {children} 
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Taekwondo App ©2024 Created by Samuel Ngigi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Layout, Avatar, Typography, Badge, Row, Col, Card, Menu } from 'antd';
// import { UserOutlined, BellOutlined, HomeOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
// import AppHeader from '../Header/Header';

// const { Content, Footer, Header, Sider } = Layout;
// const { Text } = Typography;

// interface DashboardProps {
//   user: any;
// }

// const Dashboard: React.FC<DashboardProps> = ({ user }) => {
//   const [welcomeMessage, setWelcomeMessage] = useState('');

//   useEffect(() => {
//     setWelcomeMessage(`Welcome`);
//     // , ${user.username}
//   }, [user]);

//   return (


//       <Layout>
//         <Content style={{ padding: '50px' }}>
//           <Row gutter={[16, 16]}>
//             <Col span={24}>
//               <Card bordered={false}>
//                 <Text>{welcomeMessage}</Text>
//                 <Avatar size={64} icon={<UserOutlined />} />
//               </Card>
//             </Col>
//             <Col span={24}>
//               <Card title="Dashboard Overview" bordered={false}>
//                 <Row gutter={[16, 16]}>
//                   <Col span={12}>
//                     <Card title="Upcoming Events" bordered={false}>
//                       <ul>
//                         <li>
//                           <Badge status="success" text="Event 1" />
//                         </li>
//                         <li>
//                           <Badge status="warning" text="Event 2" />
//                         </li>
//                         <li>
//                           <Badge status="error" text="Event 3" />
//                         </li>
//                       </ul>
//                     </Card>
//                   </Col>
//                   <Col span={12}>
//                     <Card title="Recent Activity" bordered={false}>
//                       <ul>
//                         <li>
//                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
//                           Activity 1
//                         </li>
//                         <li>
//                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
//                           Activity 2
//                         </li>
//                         <li>
//                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
//                           Activity 3
//                         </li>
//                       </ul>
//                     </Card>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </Content>

//         <Footer style={{ textAlign: 'center' }}>
//           Taekwondo App ©2024 Created by Samuel Ngigi
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;
