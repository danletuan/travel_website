<template>
    <AdminLayout>
      <div class="container">
        <h4 class="fw-bold mb-5">Create News</h4>
        <div class="mb-3 justify-content-between p-3 content">
          <form @submit.prevent="submitForm" class="mt-3">
            <div class="mb-3">
              <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
              <select id="category" v-model="form.category" class="form-select" required>
                <option value="" disabled>Choose item</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
              <input type="text" id="title" v-model="form.title" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="slug" class="form-label">Slug <span class="text-danger">*</span></label>
              <input type="text" id="slug" v-model="form.slug" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input type="file" id="image" @change="handleImageUpload" class="form-control" accept="image/*" />
            </div>
            <div class="mb-3" v-if="form.imagePreview">
              <img :src="form.imagePreview" alt="Image Preview" class="img-preview" />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <ckeditor :editor="editor" v-model="form.content"></ckeditor>
            </div>
            <div class="mb-3">
              <label class="form-label">Status:</label>
              <div class="form-check form-check-inline">
                <input type="radio" id="published" value="published" v-model="form.status" class="form-check-input"/>
                <label for="published" class="form-check-label">Published</label>
              </div>
              <div class="form-check form-check-inline">
                <input type="radio" id="unpublished" value="unpublished" v-model="form.status" class="form-check-input"/>
                <label for="unpublished" class="form-check-label">Unpublished</label>
              </div>
            </div>
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-secondary">Cancel</button>
              <button type="button" class="btn btn-primary">Draft</button>
              <button type="submit" class="btn btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  </template>
  
  <script>
  import AdminLayout from "@/layouts/AdminLayout.vue";
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
  export default {
    name: "CreateNews",
    components: {
      AdminLayout,
      ckeditor: CKEditor.component
    },
    data() {
      return {
        editor: ClassicEditor,
        form: {
          category: '',
          title: '',
          slug: '',
          image: null,
          imagePreview: null,
          content: '',
          status: 'published'
        },
        categories: [
          { id: 1, name: 'Adventure Travel' },
          { id: 2, name: 'Beach Explore' },
          { id: 3, name: 'World' },
          { id: 4, name: 'Family Holidays' },
          { id: 5, name: 'Art and culture' }
        ]
      };
    },
    methods: {
      submitForm() {
        // Xử lý khi form được submit
        console.log(this.form);
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png') || file.type.startsWith('image/gif'))) {
          this.form.image = file;
          this.form.imagePreview = URL.createObjectURL(file);
        } else {
          alert('Please upload a valid image file (JPEG, PNG, GIF).');
          event.target.value = null;
          this.form.image = null;
          this.form.imagePreview = null;
        }
      }
    }
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
  