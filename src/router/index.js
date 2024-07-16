import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/auth/LoginPage.vue';
import ForgotPassword from '../components/auth/ForgotPassword.vue';
import ResetPassword from '../components/auth/ResetPassword.vue';
import NewsManagement from '../components/admin/NewsManagement.vue';
import CreateNews from '../components/admin/CreateNews.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {
        path: '/news-management',
        name: 'NewsManagement',
        component: NewsManagement,
    },
    {
        path: '/create-news',
        name: 'CreateNews',
        component: CreateNews,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
