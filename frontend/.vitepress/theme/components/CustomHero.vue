<template>
  <div class="hero-wrapper">
    <div class="custom-hero">
      <div class="hero-background" :class="{ loaded: bgLoaded }">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="hero-logo">
          <img src="/logo-white.png" alt="OneScript Logo" />
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
  img.src = '/2.png';
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
  background-image: url('/2-blur.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  transition: filter 0.3s ease;
  filter: blur(10px);
}

.hero-background.loaded {
  background-image: url('/2.png');
  filter: blur(0);
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
</style>
