<template>
    <div class="container">
      <h4 class="fw-bold mb-5">Edit News</h4>
      <div class="mb-3 justify-content-between p-3 content">
        <form @submit.prevent="handleSubmit" class="mt-3">
          <div class="mb-3">
            <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
            <select id="category" v-model="selectedCategory" class="form-select" required>
              <option value="" disabled>Choose item</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
            <input type="text" id="title" v-model="title" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="slug" class="form-label">Slug <span class="text-danger">*</span></label>
            <input type="text" id="slug" v-model="slug" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <div class="d-flex justify-content-center align-items-center p-3 mt-2 mb-3 custom-file-input">
              <input
                v-show="false"
                ref="fileInput"
                type="file"
                id="image"
                @change="handleFileChange"
              />
              <button type="button" class="custom-file-btn" @click="triggerFileInput">
                Choose a file
              </button>
            </div>
            <div v-if="imageUrl" class="mb-3">
              <img :src="imageUrl" alt="Image Preview" class="img-preview" />
            </div>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <CKEditor :content="content" @updateContent="handleContent" />
          </div>
          <div class="mb-3">
            <label class="form-label">Status:</label>
            <div class="form-check form-check-inline">
              <input 
                type="radio" 
                id="published" 
                value="true" 
                v-model="published" 
                class="form-check-input" 
              />
              <label for="published" class="form-check-label">Published</label>
            </div>
            <div class="form-check form-check-inline">
              <input 
                type="radio" 
                id="unpublished" 
                value="false" 
                v-model="published" 
                class="form-check-input" 
              />
              <label for="unpublished" class="form-check-label">Unpublished</label>
            </div>
          </div>
          <div class="d-flex justify-content-center gap-2">
            <button type="button" class="btn btn-secondary" @click="handleCancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="handleDraft">Draft</button>
            <button type="submit" class="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import router from "@/router";
  import { ref, inject, watch } from "vue";
  import CKEditor from "@/components/CKEditorComponent.vue";
  
  // Thay đổi tiêu đề ngày nếu cần, hoặc sử dụng ngày hiện tại như trong CreateNews.vue
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");
  
  const currentDate = `${day}-${month}-${year}`;
  
  const showDialog = inject("showDialog");
  const confirm = inject("confirm");
  const resetConfirm = inject("resetConfirm");
  
  const categories = ref([
    { id: 1, name: 'Adventure Travel' },
    { id: 2, name: 'Beach Explore' },
    { id: 3, name: 'World' },
    { id: 4, name: 'Family Holidays' },
    { id: 5, name: 'Art and culture' }
  ]);
  const selectedCategory = ref("");
  const title = ref("");
  const slug = ref("");
  const fileInput = ref(null);
  const imageUrl = ref(null);
  const content = ref("");
  const published = ref(true); 
  const draft = ref(false);
  
  const triggerFileInput = () => {
    const fileInput = document.querySelector('#image');
    if (fileInput) fileInput.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png') || file.type.startsWith('image/gif'))) {
      imageUrl.value = URL.createObjectURL(file);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF).');
      event.target.value = null;
      imageUrl.value = null;
    }
  };
  
  const handleContent = (editorData) => {
    content.value = editorData;
  };
  
  const handleCancel = () => {
    router.push("/admin/list-news");
  };
  
  const handleDraft = () => {
    draft.value = true;
    handleSubmit();
  };
  
  const handleSubmit = () => {
    showDialog("Are you sure to edit this item?", "Edit");
  
    watch(confirm, () => {
      if (confirm.value) {
        const tempItem = {
          checked: false,
          category: selectedCategory.value,
          url: imageUrl.value,
          title: title.value,
          slug: slug.value,
          date: currentDate,
          published: published.value, 
          draft: draft.value,
          isFilter: false,
        };
  
        console.log(tempItem);
        resetConfirm();
        router.push("/admin/list-news");
      }
    });
  };
  </script>
  
  <style scoped>
  .content {
    background-color: #fff;
  }
  
  .text-danger {
    color: red;
  }
  
  .form-check-inline {
    display: inline-block;
    margin-right: 10px;
  }
  
  .d-flex {
    display: flex;
  }
  
  .justify-content-center {
    justify-content: center;
  }
  
  .gap-2 {
    gap: 20px;
  }
  
  .img-preview {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 10px;
  }
  </style>
  