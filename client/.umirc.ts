import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dashbord', component: '@/pages/components/Dashboard/Dashboard' },
    { path: '/educate', component: '@/pages/components/Educate/Educate' },
    { path: '/profile', component: '@/pages/components/Users/UserProfile' },
    { path: '/pricing', component: '@/pages/components/PricingComponent/Pricing' },
    {path: '/videofilter' , component: '@/pages/components/Educate/VideoFilter'},
    { path: '/videorating', component: '@/pages/components/Educate/VideoRating' },
    {path: '/videoupload', component: '@/pages/components/Educate/VideoUpload'}
  ],
  fastRefresh: {},
});



// // src/components/AuthWrapper.tsx
// import React from 'react';
// import { Redirect } from 'umi';
// import { getAuthToken } from '@/utils/auth'; // Function to get token from storage

// const AuthWrapper: React.FC = ({ children }) => {
//   const isAuthenticated = !!getAuthToken(); // Check if the token exists

//   if (!isAuthenticated) {
//     return <Redirect to="/login" />;
//   }

//   return <>{children}</>;
// };

// export default AuthWrapper;


// import { defineConfig } from 'umi';

// export default defineConfig({
//   nodeModulesTransform: {
//     type: 'none',
//   },
//   routes: [
//     { path: '/', component: '@/pages/index' },
//     {
//       path: '/educate',
//       component: '@/pages/Educate/Educate',
//       wrappers: ['@/components/AuthWrapper'], // Protect route
//     },
//     {
//       path: '/profile',
//       component: '@/pages/Users/UserProfile',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     {
//       path: '/pricing',
//       component: '@/pages/PricingComponent/Pricing',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     {
//       path: '/discussion',
//       component: '@/pages/Educate/DiscussionBoard',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     {
//       path: '/videofilter',
//       component: '@/pages/Educate/VideoFilter',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     {
//       path: '/videorating',
//       component: '@/pages/Educate/VideoRating',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     {
//       path: '/videoupload',
//       component: '@/pages/Educate/VideoUpload',
//       wrappers: ['@/components/AuthWrapper'],
//     },
//     { path: '/login', component: '@/pages/Auth/Login' }, // Public route for login
//   ],
//   fastRefresh: {},
// });


// // src/utils/auth.ts
// export const getAuthToken = () => localStorage.getItem('token');

// export const setAuthToken = (token: string) => localStorage.setItem('token', token);

// export const removeAuthToken = () => localStorage.removeItem('token');


// // src/pages/Users/UserProfile.tsx
// import React from 'react';
// import { useHistory } from 'umi';
// import { removeAuthToken } from '@/utils/auth';

// const UserProfile = () => {
//   const history = useHistory();

//   const handleLogout = () => {
//     removeAuthToken();  // Remove the auth token
//     history.push('/login');  // Redirect to login
//   };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserProfile;


// // Example API request with token in headers
// const token = getAuthToken();

// fetch('/api/protected-route', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
// });
