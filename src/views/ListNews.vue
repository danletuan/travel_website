<template>
    <AdminLayout>
      <div class="container">
        <h4 class="fw-bold mb-5">News Management</h4>
        <div class="d-flex mb-3 justify-content-between">
          <div class="d-flex">
            <button class="me-2 px-3 py-1 d-flex align-items-center filter">
              <img class="me-2" src="../assets/admin/icon2.png" alt="" />Filter
            </button>
            <button class="px-3 py-1 d-flex align-items-center add-news">
              <img class="me-2" src="../assets/admin/icon3.png" alt="" />Add News
            </button>
          </div>
          <div class="searching">
            <img class="searching-icon" src="../assets/admin/icon4.png" alt="" />
            <input class="searching-input" type="text" placeholder="Search" />
          </div>
        </div>
        <div v-if="selectedItems.includes(true)" class="d-flex mb-3 align-items-center selected-actions">
          <button @click="deleteSelected" class="delete-button me-2">Delete</button>
          <button @click="changeStatusSelected(true)" class="publish-button me-2">Published</button>
          <button @click="changeStatusSelected(false)" class="unpublish-button">Unpublished</button>
        </div>
        <ul class="news-list">
          <li class="d-flex justify-content-between align-items-center news-header">
            <input class="news-checkbox" type="checkbox" @click="selectAllItems" v-model="selectAll" />
            <div class="news-image">Image</div>
            <div class="news-title">Title</div>
            <div class="news-date">Created At</div>
            <div class="news-status">Status</div>
            <div class="news-action"></div>
          </li>
          <li v-for="(item, index) in displayedNews" :key="item.id" class="d-flex justify-content-between news-item">
            <input class="news-checkbox" type="checkbox" @click="selectItem(index)" v-model="selectedItems[index]" />
            <img :src="item.url" alt="news image" class="news-image" />
            <div class="news-title">{{ item.title }}</div>
            <div class="news-date">{{ item.date }}</div>
            <div class="news-status">
              <div v-if="item.published != null" :class="{'published': item.published, 'inactive': !item.published}" class="status-text text-center mb-1">
                {{ item.published ? "Published" : "Inactive" }}
              </div>
              <div v-if="item.draft" class="status-text text-center draft">Draft</div>
            </div>
            <div class="d-flex justify-content-center news-action">
              <button class="edit-button me-3">
                <img src="../assets/admin/pen.png" alt="" />
              </button>
              <button class="delete-button">
                <img src="../assets/admin/trash.png" alt="" />
              </button>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-between align-items-center news-pages">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <p>Page {{ currentPage }} of {{ totalPages }}</p>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </AdminLayout>
  </template>
  
  <script>
  import AdminLayout from "@/layouts/AdminLayout.vue";
  import { ref, computed } from "vue";
  
  export default {
    name: "ListNews",
    components: {
      AdminLayout,
    },
  
    setup() {
      const listNews = ref([
        {
          id: 1,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: true,
          draft: true,
        },
        {
          id: 2,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: true,
          draft: false,
        },
        {
          id: 3,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: false,
          draft: true,
        },
        {
          id: 4,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: false,
          draft: false,
        },
        {
          id: 5,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: null,
          draft: true,
        },
        {
          id: 6,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: null,
          draft: true,
        },
        {
          id: 7,
          url: require("@/assets/admin/image.png"),
          title: "Where can I go? 5 amazing countries that are open right now",
          date: "2024-06-30",
          published: null,
          draft: true,
        },
      ]);
  
      const selectAll = ref(false);
      const selectedItems = ref(Array(listNews.value.length).fill(false));
      const pageSize = 5;
      let currentPage = ref(1);
  
      const totalPages = computed(() => Math.ceil(listNews.value.length / pageSize));
  
      const displayedNews = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return listNews.value.slice(start, end);
      });
  
      const selectAllItems = (event) => {
        const isChecked = event.target.checked;
        selectedItems.value = Array(displayedNews.value.length).fill(isChecked);
      };
  
      const selectItem = (index) => {
        selectedItems.value[index] = !selectedItems.value[index];
        checkSelectAll();
      };
  
      const checkSelectAll = () => {
        selectAll.value = selectedItems.value.every((item) => item) || selectedItems.value.length > 0;
      };
  
      const deleteSelected = () => {
        listNews.value = listNews.value.filter((_, index) => !selectedItems.value[index]);
        selectedItems.value = Array(listNews.value.length).fill(false);
        selectAll.value = false;
      };
  
      const changeStatusSelected = (status) => {
        listNews.value = listNews.value.map((item, index) => {
          if (selectedItems.value[index]) {
            item.published = status;
          }
          return item;
        });
        selectedItems.value = Array(listNews.value.length).fill(false);
        selectAll.value = false;
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      return {
        listNews,
        selectAll,
        selectedItems,
        selectAllItems,
        selectItem,
        displayedNews,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        deleteSelected,
        changeStatusSelected,
      };
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .container {
    padding-left: 3.75rem !important;
    padding-right: 3.75rem !important;
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  .filter {
    min-width: 107px;
    height: 40px;
    color: black;
    background-color: white;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #1018280d;
  }
  
  .add-news {
    min-width: 143px;
    height: 40px;
    color: white;
    background-color: #000aff;
    border: 1px solid #7280ff;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #1018280d;
  }
  
  .searching {
    position: relative;
  }
  
  .searching-input {
    height: 40px;
    padding-left: 42px !important;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #1018280d;
  }
  
  .searching-icon {
    position: absolute;
    height: 16px;
    top: 12px;
    left: 16px;
  }
  
  .news-list {
    min-width: 720px;
    box-shadow: 0px 4px 8px -2px #1018280d;
  }
  
  .news-header {
    padding: 16px 25px 16px 25px !important;
    border-radius: 8px 8px 0px 0px;
    border: 1px solid #eaecf0;
    color: #8a92a6;
    background-color: #f9fafb;
  }
  
  .news-item {
    color: #232d42;
    padding: 20px 25px 20px 25px !important;
    background-color: white;
    border: 1px solid #eaecf0;
  }
  
  .news-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 30px !important;
  }
  
  .news-image {
    min-width: 80px;
    max-height: 50px;
    margin-right: 30px !important;
  }
  
  .news-title {
    width: 480px;
    margin-right: 30px !important;
  }
  
  .news-date {
    min-width: 95px;
    margin-right: 30px !important;
  }
  
  .news-status {
    min-width: 95px;
    margin-right: 30px !important;
  }
  
  .status-text {
    padding: 0px 15px 0px 15px !important;
    border-radius: 12px;
    color: white;
    width: min-content;
  }
  
  .published {
    background-color: #4caf50;
  }
  
  .inactive {
    background-color: #ed4c5c;
  }
  
  .draft {
    background-color: #667085;
  }
  
  .news-action {
    min-width: 116px;
  }
  
  .news-action button {
    background-color: white;
    border: none;
  }
  
  .news-pages {
    color: #344054;
    background-color: white;
    padding: 12px 24px 16px 24px !important;
    border-radius: 0px 0px 8px 8px;
    border: 1px solid #eaecf0;
  }
  
  .news-pages button {
    padding: 8px 14px 8px 14px !important;
    border-radius: 8px 0px 0px 0px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
  
    color: #344054;
    background-color: white;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #1018280d;
  }
  
  .selected-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background-color: white;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .selected-options button {
    padding: 8px 16px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    background-color: #f9fafb;
    cursor: pointer;
  }
  
  .selected-options button:hover {
    background-color: #e0e0e0;
  }

  .selected-actions {
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 8px;
}

.delete-button,
.publish-button,
.unpublish-button {
  height: 36px;
  padding: 0 15px;
  border-radius: 8px;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
}

.delete-button {
  background-color: #ED4C5C;
}

.publish-button {
  background-color: #232D42;
}

.unpublish-button {
  background-color: #232D42;
}
  </style>