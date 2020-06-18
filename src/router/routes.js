export default [
    {
        path: '/',
        name:'index',
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: '/home',
        name:'home',
        component: () => import('@/pages/home/login.vue')
    },
];
