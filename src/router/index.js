import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import ListNews from '../views/ListNews.vue';
import CreateNews from '../views/CreateNews.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

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
        path: '/list-news',
        name: 'ListNews',
        component: ListNews,
    },
    {
        path: '/create-news',
        name: 'CreateNews',
        component: CreateNews,
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: ListNews,
            },
        ],
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
