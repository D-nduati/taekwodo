import styles from './index.less';
import AuthForm from './Logins/login';
import {Card, Layout} from 'antd';
import { Container} from '@mui/material';

const { Content } = Layout;

export default function IndexPage() {
  return (
    <Container>
      <Layout>
        <Content>
          <Card style={{ width: '50%', height:'100vh' , margin: 'auto',
          textWrap: 'wrap',
          backgroundColor: '#f0f0f0', padding: 20, borderRadius: '10'}}>
          <AuthForm />
          </Card> 
        </Content>
      </Layout>
    </Container>
     
      
   
  );
}
