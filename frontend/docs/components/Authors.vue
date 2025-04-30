<template>
    <div class="contributors-container">
      <div class="contributors-grid">
        <div
          v-for="contributor in contributors"
          :key="contributor.id"
          class="contributor-card"
        >
          <img
            :src="contributor.avatar_url"
            alt="Avatar"
            class="avatar"
          />
          <h3><a :href="contributor.html_url">{{ contributor.login }}</a></h3>
          <p>Участий: {{ contributor.contributions }}</p>
        </div>
      </div>
  
      <div class="pagination">
        <button
          @click="fetchContributors(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Назад
        </button>
        <span>Страница {{ currentPage }}</span>
        <button
          @click="fetchContributors(currentPage + 1)"
          :disabled="!hasNextPage"
        >
          Далее
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    owner: { type: String, required: true },
    repo: { type: String, required: true },
    perPage: { type: Number, default: 9 }
  })
  
  const contributors = ref([])
  const currentPage = ref(1)
  const hasNextPage = ref(false)
  
  async function fetchContributors(page = 1) {
    try {
      const url = `https://api.github.com/repos/${props.owner}/${props.repo}/contributors`
      const response = await axios.get(url, {
        params: {
          per_page: props.perPage,
          page
        }
      })
  
      contributors.value = response.data
      currentPage.value = page
  
      // Check for next page
      const linkHeader = response.headers.link
      hasNextPage.value = linkHeader?.includes('rel="next"') || false
    } catch (error) {
      console.error('Failed to fetch contributors:', error)
      contributors.value = []
      hasNextPage.value = false
    }
  }
  
  watchEffect(() => {
    fetchContributors(currentPage.value)
  })
  </script>
  
  <style scoped>
  .contributors-container {
    padding: 0px;
    font-family: Arial, sans-serif;
  }
  
  .contributors-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .contributor-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    width: 250px;
    text-align: center;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .pagination {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  
  button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
  </style>
  