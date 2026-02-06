<template>
  <div class="logo-grid-section">
    <h3 class="logo-grid-title">Нам доверяют</h3>
    <div class="logo-grid">
      <a 
        v-for="(logo, index) in gridLogos" 
        :key="`${index}-${isDark}`" 
        :href="logo.url"
        target="_blank"
        rel="noopener noreferrer"
        class="logo-grid-item"
      >
        <img :src="withBase(getLogoSrc(logo))" :alt="logo.name" loading="lazy" />
        <span class="logo-grid-name">{{ logo.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from 'vitepress';
import { gridLogos } from '../../.vitepress/theme/components/logos';

const { isDark } = useData();

const getLogoSrc = (logo) => {
  return isDark.value && logo.srcDark ? logo.srcDark : logo.src;
};
</script>

<style scoped>
.logo-grid-section {
  padding: 1.5rem 0;
}

.logo-grid-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.25;
  font-size: 1.5rem;
}

.logo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 800px;
}

.logo-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
}

.logo-grid-item img {
  height: 48px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  filter: grayscale(50%);
  opacity: 0.8;
}

.dark .logo-grid-item img {
  filter: grayscale(50%) brightness(1.5);
  opacity: 0.85;
}

.logo-grid-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .logo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .logo-grid-item {
    padding: 0.75rem;
  }
  
  .logo-grid-item img {
    height: 36px;
    max-width: 90px;
  }
  
  .logo-grid-name {
    font-size: 0.7rem;
  }
}
</style>
