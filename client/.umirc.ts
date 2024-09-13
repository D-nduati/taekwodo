import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dashboard', component: '@/pages/components/Dashboard/Dashboard' },
    { path: '/educate', component: '@/pages/components/Educate/Educate' },
    { path: '/profile', component: '@/pages/components/Profile/Profile' },
    { path: '/training', component: '@/pages/components/Training/Training' },
    { path: '/pricing', component: '@/pages/components/PricingComponent/Pricing' },
    {path: '/rankings' , component: '@/pages/components/Ranking/Ranking'},
    { path: '/videorating', component: '@/pages/components/Educate/VideoRating' },
    {path: '/videoupload', component: '@/pages/components/Educate/VideoUpload'}
  ],
  fastRefresh: {},
});
