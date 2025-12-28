<template>
  <div class="hero-wrapper">
    <div class="custom-hero">
      <div class="hero-background-blur" :class="{ hidden: bgLoaded }"></div>
      <div class="hero-background-main" :class="{ visible: bgLoaded }"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-logo">
          <img src="/logo-white-small.png" alt="OneScript Logo" />
        </div>
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
      <button class="scroll-down-btn" @click="scrollToContent" aria-label="Прокрутить вниз">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const bgLoaded = ref(false);

onMounted(() => {
  const img = new Image();
  img.onload = () => {
    bgLoaded.value = true;
  };
  img.src = '/2-min.png';
});

const scrollToContent = () => {
  const targetY = window.innerHeight - 50;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 800;
  let startTime = null;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    
    window.scrollTo(0, startY + distance * eased);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
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

.hero-background-blur {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background-image: url('/2-blur.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.hero-background-blur.hidden {
  opacity: 0;
}

.hero-background-main {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background-image: url('/2-min.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.hero-background-main.visible {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 3rem auto 0 18%;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.hero-logo {
  flex-shrink: 0;
  margin-right: 1rem;
}

.hero-logo img {
  width: 200px;
  height: auto;
}

.hero-text {
  max-width: 550px;
}

.hero-title {
  font-size: 9rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 3rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-button {
  display: inline-block;
  padding: 0.65rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hero-button.primary {
  background: linear-gradient(135deg, #5194D8 0%, #345DB9 100%);
  color: white !important;
}

.hero-button.primary:hover {
  transform: translateY(-2px);
  opacity: 0.9;
  color: white !important;
}

.hero-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  .hero-logo img {
    width: 120px;
  }
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
  .hero-actions {
    justify-content: center;
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

/* Scroll down button - desktop only */
.scroll-down-btn {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: bounce-arrow 2s infinite;
}

.scroll-down-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateX(-50%) scale(1.1);
}

@keyframes bounce-arrow {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}

@media (max-width: 768px) {
  .scroll-down-btn {
    display: none;
  }
}
</style>
