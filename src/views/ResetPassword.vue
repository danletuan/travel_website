<template>
    <div class="container">
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
          <img src="../assets/auth/eye.png" class="eye-icon">
          <div v-if="passwordErrors.length" class="text-danger">
            <div v-for="error in passwordErrors" :key="error">{{ error }}</div>
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
          <img src="../assets/auth/eye.png" class="eye-icon">
          <div v-if="confirmPasswordErrors.length" class="text-danger">
            <div v-for="error in confirmPasswordErrors" :key="error">{{ error }}</div>
          </div>
        </div>
        <button type="submit" class="btn btn-success btn-block">Update Password</button>
      </form>
    </div>
  </template>
  
  <script>
  import { reactive, computed } from 'vue';
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
  
      const passwordErrors = computed(() => {
        const errors = [];
        if (!v$.value.newPassword.required) errors.push('Password is required.');
        if (state.newPassword.length > 255) errors.push('Password must be less than 255 characters.');
        return errors;
      });
  
      const confirmPasswordErrors = computed(() => {
        const errors = [];
        if (!v$.value.confirmPassword.required) errors.push('Confirm password is required.');
        if (state.confirmPassword.length > 255) errors.push('Password must be less than 255 characters.');
        if (!v$.value.confirmPassword.sameAsNewPassword) errors.push('Passwords must match.');
        return errors;
      });
  
      return {
        state,
        v$,
        handleSubmit,
        passwordErrors,
        confirmPasswordErrors,
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
    width: 404px; 
    height: 390px;
    top: 230px;
    left: 165px;
  }
  
  .eye-icon {
    position: absolute;
    right: 10px;
    top: 70%; 
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  
  .text-danger {
    color: red;
    font-size: 0.875em;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 30px;
    color: #666;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="password"] {
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
    width: 100%; 
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  