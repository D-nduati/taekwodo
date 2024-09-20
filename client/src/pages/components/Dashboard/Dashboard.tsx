// import React, { useState, useEffect } from 'react';
// import { Layout, Menu } from 'antd';
// import { HomeOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
// import { Link } from 'umi';

// import AppHeader from '../Header/Header';

// const { Content, Footer, Header, Sider } = Layout;

// interface DashboardProps {
//   user: any;
// }

// const Dashboard: React.FC<DashboardProps> = ({ user, children }) => {
//   const [welcomeMessage, setWelcomeMessage] = useState('');

//   useEffect(() => {
//     setWelcomeMessage(`Welcome`);
//   }, [user]);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={200} className="site-layout-sider" collapsible>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//           <Menu.Item key="1" icon={<HomeOutlined />}>
//             <Link to='/dashboard/land'>Home</Link>
//           </Menu.Item>
//           <Menu.Item key="2" icon={<TeamOutlined />}>
//             <Link to='/dashboard/members'>Members</Link>
//           </Menu.Item>
//           <Menu.Item key="3" icon={<SettingOutlined />}>
//             <Link to='/dashboard/settings'>Settings</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       <Layout>
//         <Header style={{ padding: '0', backgroundColor: '#fff' }}>
//           <AppHeader />
//         </Header>

//         <Content style={{ margin: '16px' }}>
//           {children} 
//         </Content>

//         <Footer style={{ textAlign: 'center' }}>
//           Taekwondo App ©2024 Created by Samuel Ngigi
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;


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

       
        <Content>
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

