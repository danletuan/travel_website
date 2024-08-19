import { defineStore } from 'pinia';
import axios from 'axios';
import router from "@/router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:8000/api/login', {
                    email,
                    password,
                }, { withCredentials: true }); // Quan trọng: cần thêm `withCredentials` để gửi cookie session

                // Cập nhật thông tin người dùng sau khi đăng nhập thành công
                this.user = response.data.user;
                this.isAuthenticated = true;

                // Lưu trạng thái vào sessionStorage
                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('isAuthenticated', 'true');

                return true; // Đăng nhập thành công
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Thông tin đăng nhập không chính xác.');
                } else if (error.response && error.response.status === 422) {
                    console.error('Validation Error:', error.response.data.errors);
                } else {
                    console.error('Lỗi đăng nhập:', error.message);
                }
                return false; // Đăng nhập thất bại
            }
        },
        async logout() {
            try {
                await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
                this.user = null;
                this.isAuthenticated = false;

                // Xóa thông tin khỏi sessionStorage
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('isAuthenticated');

                router.push('/login');
            } catch (error) {
                console.error('Lỗi khi đăng xuất:', error.message);
            }
        },
        async getUserProfile() {
            try {
                const response = await axios.get('http://localhost:8000/api/profile', { withCredentials: true });
                this.user = response.data.user;
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error.message);
            }
        },
        loadUserFromSessionStorage() {
            const storedUser = sessionStorage.getItem('user');
            const storedAuth = sessionStorage.getItem('isAuthenticated');

            if (storedUser && storedAuth === 'true') {
                this.user = JSON.parse(storedUser);
                this.isAuthenticated = true;
            }
        },
        async loadUserFromServer() {
            try {
                const response = await axios.get('http://localhost:8000/api/profile', { withCredentials: true });

                // Nếu người dùng hợp lệ, cập nhật thông tin người dùng
                this.user = response.data.user;
                this.isAuthenticated = true;

                // Lưu trạng thái vào sessionStorage
                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('isAuthenticated', 'true');
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error.message);
                // Nếu không lấy được thông tin người dùng, có thể reset trạng thái đăng nhập
                this.user = null;
                this.isAuthenticated = false;
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('isAuthenticated');
            }
        }
    }
});
