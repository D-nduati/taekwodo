 import {useState,useEffect} from 'react'
 import {Layout,Row,Col,Card, Typography, Avatar,Badge} from 'antd';
 import { UserOutlined, BellOutlined } from '@ant-design/icons';
 




 const {Content} = Layout;
 const {Paragraph} = Typography
 
 function Landing() {
  
    const [welcomeMessage, setWelcomeMessage] = useState('');
  useEffect(() => {
    setWelcomeMessage(`Welcome`);
    // , ${user.username}
  }, []);

   return (
     <Content style={{ padding: '50px' }}>
           <Row gutter={[16, 16]}>
             <Col span={24}>
               <Card bordered={false}>
                 <Paragraph>{welcomeMessage}</Paragraph>
                 <Avatar size={64} icon={<UserOutlined />} />
               </Card>
             </Col>
             <Col span={24}>
               <Card title="Dashboard Overview" bordered={false}>
                 <Row gutter={[16, 16]}>
                   <Col span={12}>
                     <Card title="Upcoming Events" bordered={false}>
                       <ul>
                         <li>
                           <Badge status="success" text="Event 1" />
                         </li>
                         <li>
                           <Badge status="warning" text="Event 2" />
                         </li>
                         <li>
                           <Badge status="error" text="Event 3" />
                         </li>
                       </ul>
                     </Card>
                   </Col>
                   <Col span={12}>
                     <Card title="Recent Activity" bordered={false}>
                       <ul>
                         <li>
                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                           Activity 1
                         </li>
                         <li>
                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                           Activity 2
                         </li>
                         <li>
                           <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                           Activity 3
                         </li>
                       </ul>
                     </Card>
                   </Col>
                 </Row>
               </Card>
             </Col>
           </Row>
         </Content> 
   )
 }
 
 export default Landing
 
 
 