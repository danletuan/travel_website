<template>
  <div class="container">
    <h1 class="display-4 mb-3">Create your account</h1>
    <p class="text-muted mb-4">Fill in the details to register</p>
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="state.name"
          placeholder="Enter your name"
        />
        <div v-if="nameErrors.length" class="text-danger mt-1">
          <div v-for="error in nameErrors" :key="error">{{ error }}</div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="state.email"
          placeholder="Enter your email"
        />
        <div v-if="emailErrors.length" class="text-danger mt-1">
          <div v-for="error in emailErrors" :key="error">{{ error }}</div>
        </div>
      </div>
      <div class="form-group mb-3 position-relative">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="state.password"
          placeholder="Enter your password"
        />
        <img src="../assets/auth/eye.png" class="eye-icon" />
        <div v-if="passwordErrors.length" class="text-danger mt-1">
          <div v-for="error in passwordErrors" :key="error">{{ error }}</div>
        </div>
      </div>
      <div class="form-group mb-3 position-relative">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="state.confirmPassword"
          placeholder="Confirm your password"
        />
        <img src="../assets/auth/eye.png" class="eye-icon" />
        <div v-if="confirmPasswordErrors.length" class="text-danger mt-1">
          <div v-for="error in confirmPasswordErrors" :key="error">{{ error }}</div>
        </div>
      </div>
      <button type="submit" class="btn btn-success btn-block w-100">Register</button>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, maxLength } from '@vuelidate/validators';
import axios from 'axios';

const router = useRouter();

const state = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  name: { required, maxLength: maxLength(255) },
  email: { required, email, maxLength: maxLength(255) },
  password: { required, maxLength: maxLength(255) },
  confirmPassword: { required, sameAs: sameAs(() => state.value.password) }
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    try {
      const response = await axios.post('http://localhost:3000/travel_website_be/php/Register.php', {
        name: state.value.name,
        email: state.value.email,
        password: state.value.password,
      });

      if (response.data.success) {
        router.push('/');
      } else {
        errorMessage.value = response.data.message;
      }
    } catch (error) {
      errorMessage.value = 'An error occurred. Please try again.';
    }
  } else {
    console.log('Form failed validation');
    console.log(v$.value.$errors); // Print validation errors to console
  }
};

const nameErrors = computed(() => {
  const errors = [];
  if (!v$.value.name.$pending && !v$.value.name.required) errors.push('Name is required.');
  if (state.value.name.length > 255) errors.push('Name must be less than 255 characters.');
  return errors;
});

const emailErrors = computed(() => {
  const errors = [];
  if (!v$.value.email.$pending && !v$.value.email.required) errors.push('Email is required.');
  if (!v$.value.email.$pending && !v$.value.email.email) errors.push('Email is not valid.');
  if (state.value.email.length > 255) errors.push('Email must be less than 255 characters.');
  return errors;
});

const passwordErrors = computed(() => {
  const errors = [];
  if (!v$.value.password.$pending && !v$.value.password.required) errors.push('Password is required.');
  if (state.value.password.length > 255) errors.push('Password must be less than 255 characters.');
  return errors;
});

const confirmPasswordErrors = computed(() => {
  const errors = [];
  if (!v$.value.confirmPassword.$pending && !v$.value.confirmPassword.required) errors.push('Confirm password is required.');
  if (!v$.value.confirmPassword.$pending && !v$.value.confirmPassword.sameAs) errors.push('Passwords do not match.');
  return errors;
});

const errorMessage = ref('');

// Watch for changes in state and touch validation
watch(state, () => {
  v$.value.$touch();
});
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
  height: auto; 
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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

input[type="email"], input[type="password"], input[type="text"] {
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
