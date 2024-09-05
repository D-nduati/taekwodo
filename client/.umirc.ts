import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/educate', component: '@/pages/Educate/Educate' },
    { path: '/profile', component: '@/pages/Users/UserProfile' },
    { path: '/pricing', component: '@/pages/PricingComponent/Pricing' },
    { path: '/discussion', component:'@/pages/Educate/DiscussionBoard'},
    {path: '/videofilter' , component: '@/pages/Educate/VideoFilter'},
    { path: '/videorating', component: '@/pages/Educate/VideoRating' },
    {path: '/videoupload', component: '@/pages/Educate/VideoUpload'}
  ],
  fastRefresh: {},
});