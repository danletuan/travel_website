<template>
    <AuthLayout>
        <div class="container">
          <div v-if="!showCheckEmailMessage">
            <h1 class="display-4 mb-3">Forgot password</h1>
            <p class="text-muted mb-4">Please enter your email to reset the password</p>
            <form @submit.prevent="handleSubmit">
              <div class="form-group mb-3">
                <label for="email">Email address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  name="email" 
                  v-model="state.email" 
                  placeholder="Enter your email"
                >
                <div v-if="emailErrors.length" class="text-danger mt-1">
                  <div v-for="error in emailErrors" :key="error">{{ error }}</div>
                </div>
              </div>
              <button type="submit" class="btn btn-success w-100">Send</button>
            </form>
          </div>
          <div v-else>
            <h1 class="display-4 mb-3">Check your email</h1>
            <p class="text-muted mb-4">We sent you an email with instructions for resetting your password</p>
          </div>
        </div>
    </AuthLayout>
    
</template>
  
  <script>
  import { ref, reactive, computed } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required, email } from '@vuelidate/validators';
  import AuthLayout from "@/layouts/AuthLayout.vue";
  
  export default {
    name: 'ForgotPassword',

    components: {
        AuthLayout,
    },

    setup() {
      const state = reactive({
        email: '',
      });
  
      const rules = {
        email: { 
          required, 
          email, 
          maxLength: (value) => value.length <= 255 || 'Email must be less than 255 characters.' 
        },
      };
  
      const v$ = useVuelidate(rules, state);
      const showCheckEmailMessage = ref(false);
  
      const handleSubmit = () => {
        v$.value.$touch();
        if (!v$.value.$invalid) {
          console.log("Forgot password form submitted with", state.email);
          showCheckEmailMessage.value = true;
        }
      };
  
      const emailErrors = computed(() => {
        const errors = [];
        if (!v$.value.email.required) errors.push('Email is required.');
        if (!v$.value.email.email) errors.push('Email is not valid.');
        if (state.email.length > 255) errors.push('Email must be less than 255 characters.');
        return errors;
      });
  
      return {
        state,
        v$,
        showCheckEmailMessage,
        handleSubmit,
        emailErrors
      };
    }
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
  
  input[type="email"] {
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
  