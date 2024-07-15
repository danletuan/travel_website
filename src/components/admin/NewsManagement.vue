<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 bg-dark text-white min-vh-100">
        <div class="p-3">
          <h2>Admin</h2>
          <nav class="nav flex-column">
            <router-link class="nav-link text-white" to="/tours">Tours</router-link>
            <router-link class="nav-link text-white" to="/news-management">News</router-link>
            <router-link class="nav-link text-white" to="/bookings">Bookings</router-link>
          </nav>
        </div>
      </div>
      <div class="col-md-10 p-4">
        <div class="d-flex justify-content-end align-items-center mb-4">
            <div class="ms-auto d-flex align-items-center">
                <p class="mb-0 me-3">john</p>
                <img src="../../assets/admin/avatar.png" alt="Admin Avatar" class="avatar-img">
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>News Management</h1>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <button class="btn btn-outline-secondary me-2">Filters</button>
            <button class="btn btn-primary">+ Add News</button>
          </div>
          <div class="ms-auto">
            <input type="text" class="form-control" placeholder="Search">
          </div>
        </div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col"><input type="checkbox"></th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Created At</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="news in newsList" :key="news.id">
              <td><input type="checkbox"></td>
              <td><img :src="require(`@/assets/admin/${news.image}`)" alt="news image" class="img-fluid mx-auto d-block"></td>
              <td>{{ news.title }}</td>
              <td>{{ news.createdAt }}</td>
              <td>
                <span :class="['badge', news.status === 'Published' ? 'bg-success' : news.status === 'Inactive' ? 'bg-danger' : 'bg-secondary']">
                  {{ news.status }}
                </span>
                <span v-if="news.draft" class="badge bg-secondary">Draft</span>
              </td>
              <td>
                <button class="btn btn-outline-secondary btn-sm me-2" @click="editNews(news.id)">
                  <img src="@/assets/admin/pen.png" alt="edit">
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteNews(news.id)">
                  <img src="@/assets/admin/trash.png" alt="delete">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-secondary">Previous</button>
          <span>Page 1 of 10</span>
          <button class="btn btn-outline-secondary">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const newsList = ref([
      {
        id: 1,
        image: 'image.png',
        title: 'Where can I go? 5 amazing countries that are open right now',
        createdAt: '2024-06-30',
        status: 'Published',
        draft: true,
      },
      {
        id: 2,
        image: 'image.png',
        title: 'Where can I go? 5 amazing countries that are open right now',
        createdAt: '2024-06-30',
        status: 'Published',
        draft: false,
      },
      {
        id: 3,
        image: 'image.png',
        title: 'Where can I go? 5 amazing countries that are open right now',
        createdAt: '2024-06-30',
        status: 'Inactive',
        draft: true,
      },
      {
        id: 4,
        image: 'image.png',
        title: 'Where can I go? 5 amazing countries that are open right now',
        createdAt: '2024-06-30',
        status: 'Inactive',
        draft: false,
      },
      {
        id: 5,
        image: 'image.png',
        title: 'Where can I go? 5 amazing countries that are open right now',
        createdAt: '2024-06-30',
        status: '',
        draft: true,
      },
    ]);

    const editNews = (id) => {
      console.log('Editing news with ID:', id);
    };

    const deleteNews = (id) => {
      console.log('Deleting news with ID:', id);
    };

    return {
      newsList,
      editNews,
      deleteNews,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #F5F5F9;
  color: white;
  font-family: 'Inter', sans-serif;
}
.container-fluid {
  padding: 0;
}
h1 {
  font-size: 1.5rem;
}
.table th, .table td {
  vertical-align: middle;
}
.bg-dark {
  background-color: #363740 !important;
}
.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
