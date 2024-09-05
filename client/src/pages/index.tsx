
import AuthForm from './Logins/login';
import {Card, Layout} from 'antd';


const { Content } = Layout;

export default function IndexPage() {
  return (    
      <Layout>
        <Content>
          <Card>
          <AuthForm />
          </Card> 
        </Content>
      </Layout> 
  );
}
