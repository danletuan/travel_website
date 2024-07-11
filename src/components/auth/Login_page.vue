<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="row w-75 shadow-lg rounded overflow-hidden">
        <div class="col-md-6 bg-white d-flex justify-content-center align-items-center p-5">
          <div class="w-100">
            <h1>Welcome back!</h1>
            <p>Enter your Credentials to access your account</p>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" placeholder="Enter your email">
              </div>
              <div class="form-group position-relative">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password" placeholder="Enter your password">
                <img src="../../assets/auth/eye.png" class="eye-icon">
              </div>
              <a href="Forgot_password.html" class="forgot-password d-block mb-3">Forgot password</a>
              <button type="submit" class="btn btn-success btn-block">Login</button>
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
import { ref } from 'vue';

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log("Form submitted with", email.value, password.value);
    };

    return {
      email,
      password,
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
</style>

