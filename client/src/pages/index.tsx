
// import { Header } from 'antd/lib/layout/layout';
import AuthForm from './components/Logins/login';
// import AppHeader from './Header/Header';
import {Card, Layout} from 'antd';


const { Content } = Layout;

export default function IndexPage() {
  return (    
      <Layout>       
        <AuthForm />     
      </Layout> 
  );
}
