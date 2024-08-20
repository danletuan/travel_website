import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import ListNews from '../views/ListNews.vue';
import CreateNews from '../views/CreateNews.vue';
import EditNews from '@/views/EditNews.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import RegisterPage from '@/views/RegisterPage.vue';

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'Login',
                component: LoginPage,
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: ForgotPassword,
            },
            {
                path: '/reset-password',
                name: 'ResetPassword',
                component: ResetPassword,
                props: route => ({ token: route.query.token })
            },
            {
                path: 'register',
                name: 'RegisterPage',
                component: RegisterPage,
            },
        ],
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: 'list-news',
                component: ListNews,
            },
            {
                path: 'create-news',
                component: CreateNews,
            },
            {
                path: "/edit-news/:id",
                component: EditNews,
            },

        ],
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
