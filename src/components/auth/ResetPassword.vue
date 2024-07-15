<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="row w-75 shadow-lg rounded overflow-hidden">
      <div class="col-md-6 bg-white d-flex justify-content-center align-items-center p-5">
        <div class="w-100">
          <h1>Reset password</h1>
          <form @submit.prevent="handleSubmit">
            <div class="form-group position-relative">
              <label for="password">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                name="password" 
                v-model="state.newPassword" 
                placeholder="Enter your new password"
              >
              <img src="../../assets/auth/eye.png" class="eye-icon">
              <div v-if="v$.newPassword.$invalid" class="text-danger">
                <div v-if="!v$.newPassword.required">Password is required.</div>
                <div v-if="state.newPassword.length > 255">Password must be less than 255 characters.</div>
              </div>
            </div>
            <div class="form-group position-relative">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="confirmPassword" 
                name="confirmPassword" 
                v-model="state.confirmPassword" 
                placeholder="Re-enter password"
              >
              <img src="../../assets/auth/eye.png" class="eye-icon">
              <div v-if="v$.confirmPassword.$invalid" class="text-danger">
                <div v-if="!v$.confirmPassword.required">Confirm password is required.</div>
                <div v-if="state.confirmPassword.length > 255">Password must be less than 255 characters.</div>
                <div v-if="!v$.confirmPassword.sameAsNewPassword">Passwords must match.</div>
              </div>
            </div>
            <button type="submit" class="btn btn-success btn-block">Update Password</button>
          </form>
        </div>
      </div>
      <div class="col-md-6 p-0">
        <img src="../../assets/auth/image1.png" class="img-fluid w-100 h-100" alt="Background Image"
          style="border-radius: 45px 0 0 45px; object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';

export default {
  name: 'ResetPassword',
  setup() {
    const state = reactive({
      newPassword: '',
      confirmPassword: '',
    });

    const rules = {
      newPassword: { 
        required,
        maxLength: (value) => value.length <= 255 || 'Password must be less than 255 characters.',
      },
      confirmPassword: { 
        required,
        maxLength: (value) => value.length <= 255 || 'Password must be less than 255 characters.',
        sameAsNewPassword: sameAs(state.newPassword),
      },
    };

    const v$ = useVuelidate(rules, state);

    const handleSubmit = () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        console.log("Reset password form submitted with", state.newPassword);
        // Add your form submission logic here
      }
    };

    return {
      state,
      v$,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.container {
  display: flex;
  width: 80%;
  max-width: 1000px;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.left, .right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.left {
  background-color: white;
}

.right {
  background-color: #f7f7f7;
}

.left-content {
  width: 100%;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #666;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="email"], input[type="password"] {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

input::placeholder {
  opacity: 0.3;
  color: #000;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.forgot-password {
  align-self: flex-end;
  color: #0C2A92;
  text-decoration: none;
  margin-bottom: 20px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

.text-danger {
  color: red;
  font-size: 0.875em;
}
</style>
