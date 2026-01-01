<template>
  <div class="logo-carousel-section">
    <h2 class="logo-carousel-title">Нам доверяют</h2>
    <div class="logo-carousel-wrapper">
      <div class="logo-carousel">
        <div class="logo-track" ref="trackRef" :style="{ transform: `translateX(${offset}px)` }">
          <a 
            v-for="(logo, index) in allLogos" 
            :key="index" 
            :href="logo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="logo-item"
          >
            <img :src="isDark && logo.srcDark ? logo.srcDark : logo.src" :alt="logo.name" loading="lazy" />
            <span class="logo-name">{{ logo.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';

const { isDark } = useData();

const baseLogos = [
  { src: '/logos/infostart.png', srcDark: undefined, name: 'Infostart', url: 'https://www.infostart.ru/' },
  { src: '/logos/korus.png', srcDark: undefined, name: 'КОРУС Консалтинг', url: 'https://korusconsulting.ru/' },
  { src: '/logos/OzonTech_light.png', srcDark: '/logos/OzonTech_dark.png', name: 'OZON Tech', url: 'https://ozon.ru/' },
  { src: '/logos/Ventra_light.png', srcDark: '/logos/Ventra_dark.png', name: 'Ventra', url: 'https://ventra.ru/' },
  { src: '/logos/mir_instr.png', srcDark: undefined, name: 'Мир инструмента', url: 'https://instrument.ru/' },
  // Пример добавления логотипа с отдельной версией для темной темы:
  // { src: '/logos/example.png', srcDark: '/logos/example-dark.png', name: 'Example', url: 'https://example.com/' },
];

// Repeat enough times to fill and loop seamlessly
const allLogos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

const offset = ref(0);
const trackRef = ref(null);
let animationId = null;
let lastTime = 0;
const speed = 50; // pixels per second

const animate = (currentTime) => {
  if (!lastTime) lastTime = currentTime;
  const delta = currentTime - lastTime;
  lastTime = currentTime;
  
  offset.value -= (speed * delta) / 1000;
  
  // Reset when half of the track has scrolled
  if (trackRef.value) {
    const trackWidth = trackRef.value.scrollWidth / 2;
    if (Math.abs(offset.value) >= trackWidth) {
      offset.value = 0;
    }
  }
  
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<style>
.logo-carousel-section {
  padding: 1.5rem 2rem 2rem;
  background: var(--vp-c-bg-soft);
}

.logo-carousel-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 2rem 0 !important;
  padding: 0 !important;
  border: none !important;
}

.logo-carousel-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.logo-carousel {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.logo-track {
  display: flex;
  gap: 4rem;
  will-change: transform;
}

.logo-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-item img {
  height: 60px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.dark .logo-item img {
  filter: grayscale(100%) brightness(2.5) contrast(0.8);
  opacity: 0.7;
}

.logo-item:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

.dark .logo-item:hover img {
  filter: grayscale(0%) brightness(1);
  opacity: 1;
}

.logo-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo-item:hover .logo-name {
  opacity: 1;
}

@media (max-width: 768px) {
  .logo-track {
    gap: 3rem;
  }
  
  .logo-item img {
    height: 40px;
    max-width: 100px;
  }
}
</style>
