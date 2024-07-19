<template>
    <div class="account">
      <div class="container-fluid">
        <div class="row w-100 vh-100">
          <div class="d-none d-lg-block col-lg-2 tab">
            <h1 class="text-center align-content-center fw-bold admin">Admin</h1>
            <nav class="nav flex-column">
              <router-link class="nav-link" :class="{ 'active-link': $route.path === '/tours' }" to="/tours">
                <img src="../assets/admin/icon1.png" alt="Tours Icon" class="me-2 icon">
                Tours
              </router-link>
              <router-link class="nav-link" :class="{ 'active-link': $route.path === '/list-news' }" to="/list-news">
                <img src="../assets/admin/icon1.png" alt="News Icon" class="me-2 icon">
                News
              </router-link>
              <router-link class="nav-link" :class="{ 'active-link': $route.path === '/bookings' }" to="/bookings">
                <img src="../assets/admin/icon1.png" alt="Bookings Icon" class="me-2 icon">
                Bookings
              </router-link>
            </nav>
          </div>
  
          <div class="col-lg-10 content">
            <div class="d-flex justify-content-between justify-content-lg-end align-items-center px-3 px-lg-5 account-header">
              <div class="d-flex align-items-center">
                <p class="d-none d-lg-block me-2 name">{{ name }}</p>
                <img :src="avatar" alt="avatar" />
              </div>
            </div>
            <div class="px-3 px-lg-5 py-4 py-lg-5">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "AdminLayout",
  
    setup() {
      const name = ref("John");
      const avatar = require("../assets/admin/avatar.png");
  
      return {
        name,
        avatar,
      };
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  .nav {
    margin-left: 30px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    margin-left: 10px ;
    color: #a4a6b3; 
  }
  
  .nav-link .icon {
    margin-right: 10px ;
  }
  
  .nav-link:hover {
    color: #ffffff; 
  }
  
  .tab {
    background-color: #363740;
  }
  
  .admin {
    color: white;
  }
  
  .icon {
    object-fit: contain;
  }
  
  .content {
    background-color: #eaecf0;
  }
  
  .account-header {
    border-bottom: #cfcfcf solid;
    background-color: white;
    height: 100px;
  }
  
  .account,
  .admin {
    height: 100px;
  }
  
  .active-link {
    color: #ffffff; 
  }
  </style>
  