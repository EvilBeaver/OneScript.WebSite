<template>
  <div class="hero-wrapper">
    <div class="custom-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">OneScript</h1>
          <p class="hero-description">
            Независимая кросс-платформенная реализация виртуальной машины, исполняющей скрипты на языке 1С:Предприятие 8
          </p>
          <div class="hero-actions">
            <a href="/learn/" class="hero-button primary">Изучить</a>
            <a href="/downloads/" class="hero-button secondary">Скачать</a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToContent">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const scrollToContent = () => {
  const content = document.querySelector('.features-section');
  if (content) {
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

onMounted(() => {
  // Ensure scroll works after component is mounted
  console.log('CustomHero mounted');
});
</script>

<style>
.hero-wrapper {
  position: relative;
  margin-top: calc(-1 * var(--vp-nav-height, 64px));
  overflow: hidden;
}

.custom-hero {
  position: relative;
  width: 100%;
  height: calc(100vh + var(--vp-nav-height, 64px));
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background-image: url('/2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.hero-text {
  max-width: 700px;
}

.hero-title {
  font-size: 7rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 3rem 0;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero-button {
  display: inline-block;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.hero-button.primary {
  background: linear-gradient(135deg, #5194D8 0%, #345DB9 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(81, 148, 216, 0.4);
}

.hero-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(81, 148, 216, 0.6);
}

.hero-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  z-index: 2;
  cursor: pointer;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  padding: 0.5rem;
  animation: hero-bounce 2s ease-in-out infinite;
}

.scroll-indicator:hover {
  opacity: 1;
}

@keyframes hero-bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-15px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-button {
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 0.95rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .hero-button {
    width: 100%;
    text-align: center;
  }
}
</style>
