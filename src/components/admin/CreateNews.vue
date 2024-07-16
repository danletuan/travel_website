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
              <p class="mb-0 me-3">John</p>
              <img src="@/assets/admin/avatar.png" alt="Admin Avatar" class="avatar-img">
            </div>
          </div>
          <h1>Create News</h1>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="category" class="form-label">Category *</label>
              <select class="form-select" id="category" v-model="category">
                <option disabled value="">Choose Item</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">Title *</label>
              <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter title">
            </div>
            <div class="mb-3">
              <label for="slug" class="form-label">Slug *</label>
              <input type="text" class="form-control" id="slug" v-model="slug" placeholder="Enter slug">
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input type="file" class="form-control" id="image" @change="handleImageUpload">
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <!-- <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor> -->
            </div>
            <div class="mb-3">
              <label>Status:</label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="published" value="Published" v-model="status">
                  <label class="form-check-label" for="published">Published</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="unpublished" value="Unpublished" v-model="status">
                  <label class="form-check-label" for="unpublished">Unpublished</label>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-secondary" @click="handleCancel">Cancel</button>
              <div>
                <button type="button" class="btn btn-secondary me-2" @click="saveDraft">Draft</button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <!-- <script>
  import { ref } from 'vue';
  // import { CKEditor } from '@ckeditor/ckeditor5-vue';
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
  export default {
    components: {
      // ckeditor: CKEditor.component
    },
    setup() {
      const category = ref('');
      const title = ref('');
      const slug = ref('');
      const image = ref(null);
      const content = ref('');
      const status = ref('Published');
      const categories = ref(['Category 1', 'Category 2', 'Category 3']); // Replace with actual categories
      // const editor = ClassicEditor;
      const editorConfig = {
        toolbar: [
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
          'undo', 'redo', 'imageUpload', 'heading', 'insertTable', 'mediaEmbed'
        ]
      };
  
      const handleSubmit = () => {
        console.log({
          category: category.value,
          title: title.value,
          slug: slug.value,
          image: image.value,
          content: content.value,
          status: status.value
        });
        // Add your form submission logic here
      };
  
      const handleCancel = () => {
        // Add your cancel logic here
      };
  
      const saveDraft = () => {
        console.log('Save as draft');
        // Add your save draft logic here
      };
  
      const handleImageUpload = (event) => {
        image.value = event.target.files[0];
      };
  
      return {
        category,
        title,
        slug,
        image,
        content,
        status,
        categories,
        editor,
        editorConfig,
        handleSubmit,
        handleCancel,
        saveDraft,
        handleImageUpload
      };
    }
  };
  </script> -->
  
  <style scoped>
  body {
    background-color: #F5F5F9;
    font-family: 'Inter', sans-serif;
  }
  .container-fluid {
    padding: 0;
  }
  h1 {
    font-size: 1.5rem;
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
  