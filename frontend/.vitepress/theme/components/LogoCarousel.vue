<template>
  <div class="logo-carousel-section">
    <h2 class="logo-carousel-title">Нам доверяют</h2>
    <div class="logo-carousel-wrapper">
      <div class="logo-carousel">
        <div class="logo-track-container">
          <div class="logo-track">
            <div 
              v-for="(logo, index) in logos" 
              :key="'a-' + index" 
              class="logo-item"
            >
              <img :src="logo.src" :alt="logo.name" />
              <span class="logo-name">{{ logo.name }}</span>
            </div>
          </div>
          <div class="logo-track">
            <div 
              v-for="(logo, index) in logos" 
              :key="'b-' + index" 
              class="logo-item"
            >
              <img :src="logo.src" :alt="logo.name" />
              <span class="logo-name">{{ logo.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseLogos = [
  { src: '/logos/NASA.png', name: 'NASA' },
  { src: '/logos/Б.Ю.Александров.png', name: 'Б.Ю.Александров' },
  { src: '/logos/Мелкософт.png', name: 'Мелкософт' },
  { src: '/logos/Уганда.png', name: 'Уганда' },
];

// Repeat to fill the screen width
const logos = [...baseLogos, ...baseLogos, ...baseLogos];
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

.logo-track-container {
  display: flex;
  width: fit-content;
  animation: scroll-logos 20s linear infinite !important;
}

.logo-track {
  display: flex;
  gap: 4rem;
  padding-right: 4rem;
}

.logo-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
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

.logo-item:hover img {
  filter: grayscale(0%);
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
    gap: 2rem;
  }
  
  .logo-item img {
    height: 40px;
    max-width: 100px;
  }
}
</style>
