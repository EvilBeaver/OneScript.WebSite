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
            Независимая кроссплатформенная реализация виртуальной машины, исполняющей скрипты на языке 1С:Предприятие 8
          </p>
          <div class="hero-actions">
            <a href="/learn/" class="hero-button primary">Изучить</a>
            <a href="/downloads/" class="hero-button secondary">Скачать</a>
          </div>
        </div>
      </div>
      <div class="hero-code-decoration">
        <pre><code><span class="keyword">#Использовать</span> fs

<span class="keyword">Процедура</span> <span class="function">ОбработатьФайлы</span>()
    Путь  = ФС.НормализоватьПуть(<span class="string">"./data"</span>);
    Файлы = НайтиФайлы(Путь, <span class="string">"*.json"</span>);

    <span class="keyword">Для Каждого</span> Файл <span class="keyword">Из</span> Файлы <span class="keyword">Цикл</span>
        ЧтениеJSON = <span class="keyword">Новый</span> ЧтениеJSON;
        ЧтениеJSON.ОткрытьФайл(Файл.ПолноеИмя);
        Данные = ПрочитатьJSON(ЧтениеJSON);
        ОбработатьДанные(Данные);
    <span class="keyword">КонецЦикла</span>;

<span class="keyword">КонецПроцедуры</span>

<span class="keyword">Процедура</span> <span class="function">ОбработатьДанные</span>(Данные)
    <span class="keyword">Для Каждого</span> Элемент <span class="keyword">Из</span> Данные <span class="keyword">Цикл</span>
        Сообщить(Элемент.Значение);
    <span class="keyword">КонецЦикла</span>;
<span class="keyword">КонецПроцедуры</span>
</code></pre>
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
  // Temporarily disable CSS smooth scroll to avoid conflicts
  const html = document.documentElement;
  const originalBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  
  const targetY = window.innerHeight - 50;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 600;
  const startTime = performance.now();

  const easeOutQuad = (t) => t * (2 - t);

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuad(progress);
    
    window.scrollTo(0, startY + distance * eased);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      html.style.scrollBehavior = originalBehavior;
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
  margin: 3rem auto 0 15%;
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
  transition: opacity 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.hero-button.primary {
  background: linear-gradient(135deg, #5194D8 0%, #345DB9 100%);
  color: white !important;
}

.hero-button.primary:hover {
  opacity: 0.9;
  color: white !important;
}

.hero-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  color: white !important;
}

@media (max-width: 768px) {
  .custom-hero {
    align-items: flex-start;
    padding-top: calc(var(--vp-nav-height, 64px) + 4rem);
  }
  .hero-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    margin: 0 auto;
    padding: 0 1.5rem;
    align-items: center;
  }
  .hero-logo {
    margin-right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
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

/* Decorative code block */
.hero-code-decoration {
  position: absolute;
  right: 15%;
  top: 51%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  max-width: 480px;
  opacity: 0.85;
}

.hero-code-decoration pre {
  margin: 0;
  padding: 0;
  background: transparent;
  overflow: hidden;
}

.hero-code-decoration code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  white-space: pre;
}

.hero-code-decoration .comment {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.hero-code-decoration .keyword {
  color: #93c5fd;
}

.hero-code-decoration .function {
  color: #fcd34d;
}

.hero-code-decoration .string {
  color: #86efac;
}

@media (max-width: 1800px) {
  .hero-code-decoration {
    display: none;
  }
}
</style>
