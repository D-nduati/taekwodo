import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      redirect: '/land', 
    },
    {
      path: '/login',
      component: '@/pages/components/Logins/Login',
    },
    {
      path: '/land',
      component: '@/pages/components/LandingPage/Land',
    },
    {
      path: '/admin',
      component: '@/pages/components/admin/Admin'

    },
    {
      path: '/dashboard',
      component: '@/pages/components/Dashboard/Dashboard',
      routes: [
        { path: '/dashboard/profile', component: '@/pages/components/Profile/Profile' },
        { path: '/dashboard/educate', component: '@/pages/components/Educate/Educate' },
        { path: '/dashboard/training', component: '@/pages/components/Training/Training' },
        { path: '/dashboard/rankings', component: '@/pages/components/Ranking/Ranking' },
        { path: '/dashboard/quiz', component: '@/pages/components/Quizes/Quiz' },
        { path: '/dashboard/members', component: '@/pages/components/Members/Members' },
        { path: '/dashboard/settings', component: '@/pages/components/Settings/Settings' },
        { path: '/dashboard/enroll', component: '@/pages/components/Enroll/EnrollWithUs' },
        // { path: '/dashboard/home', component: '@/pages/components/Home/Home' }, // Example Home component
      ],
    },
  ],
  fastRefresh: {},
});
