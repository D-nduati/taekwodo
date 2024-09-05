
import { Header } from 'antd/lib/layout/layout';
import AuthForm from './Logins/login';
import AppHeader from './Header/Header';
import {Card, Layout} from 'antd';


const { Content } = Layout;

export default function IndexPage() {
  return (    
      <Layout>
        <Header>
       < AppHeader />
        </Header>
        <Content>
          <Card>
          <AuthForm />
          </Card> 
        </Content>
      </Layout> 
  );
}
