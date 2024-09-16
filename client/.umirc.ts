import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/components/Logins/Login', 
      routes: [
        { path: '/land', component: '@/pages/components/LandingPage/Land' },
        { path: '/profile', component: '@/pages/components/Profile/Profile' },
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


