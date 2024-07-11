import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/auth/Login_page.vue';
import ForgotPassword from '../components/auth/Forgot_password.vue';
import ResetPassword from '../components/auth/Reset_password.vue';

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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
