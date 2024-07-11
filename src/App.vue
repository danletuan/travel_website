<template>
  <LoginPage/>
  <ResetPassword/>
  <ForgotPassword/>
</template>

<script>
import LoginPage from './components/auth/Login_page.vue'
import ResetPassword from './components/auth/Reset_password.vue'
import ForgotPassword from './components/auth/Forgot_password.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    ResetPassword,
    ForgotPassword
  }
}
</script>

