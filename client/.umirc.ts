import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', //should show the login form
      routes: [
        
        { path: '/login', component: '@/pages/components/Logins/Login' },
        { path: '/land', component: '@/pages/components/LandingPage/Land' },
        {path: '/dashboard', component: '@/pages/components/Dashboard/Dashboard'},
        { path: '/profile', component: '@/pages/components/Profile/Profile' },
        { path: '/educate', component: '@/pages/components/Educate/Educate' },
        { path: '/training', component: '@/pages/components/Training/Training' }, 
        { path: '/rankings', component: '@/pages/components/Ranking/Ranking' }, 
        { path: '/quiz', component: '@/pages/components/Quizes/Quiz' }, 
        { path: '/members', component: '@/pages/components/Members/Members' }, 
        { path: '/settings', component: '@/pages/components/Settings/Settings' }, 
        { path: '/enroll', component: '@/pages/components/Enroll/EnrollWithUs' }, 
      ],
      fastRefresh: {},
    },
  ],
});