<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted, onUnmounted, watch } from "vue";
import { useRouter, useData } from "vitepress";
import mediumZoom from "medium-zoom";

const { Layout } = DefaultTheme;
const router = useRouter();
const { frontmatter } = useData();

// Setup medium zoom with the desired options
const setupMediumZoom = () => {
  mediumZoom("[data-zoomable]", {
    background: "transparent",
  });
};

// Mark html with home class for CSS to work immediately
const updateHomeClass = () => {
  const isHome = frontmatter.value.layout === 'home';
  if (isHome) {
    document.documentElement.classList.add('is-home-page');
    document.body.classList.add('is-home-page');
  } else {
    document.documentElement.classList.remove('is-home-page');
    document.body.classList.remove('is-home-page');
  }
};

// Handle navbar scroll state on home page with gradual opacity
const handleScroll = () => {
  const navbar = document.querySelector('.VPNavBar');
  if (!navbar) return;
  
  const isHome = frontmatter.value.layout === 'home';
  if (!isHome) {
    navbar.classList.remove('scrolled');
    navbar.style.removeProperty('--navbar-opacity');
    return;
  }
  
  const scrollY = window.scrollY;
  const fadeStart = window.innerHeight * 0.25;
  const fadeEnd = window.innerHeight * 0.85;
  
  if (scrollY <= fadeStart) {
    navbar.style.setProperty('--navbar-opacity', '0');
    navbar.classList.remove('scrolled');
  } else if (scrollY >= fadeEnd) {
    navbar.style.setProperty('--navbar-opacity', '1');
    navbar.classList.add('scrolled');
  } else {
    const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    navbar.style.setProperty('--navbar-opacity', progress.toString());
    navbar.classList.remove('scrolled');
  }
};

const setupNavbarTransparency = () => {
  updateHomeClass();
  handleScroll();
  window.addEventListener('scroll', handleScroll);
};

const cleanupNavbarTransparency = () => {
  window.removeEventListener('scroll', handleScroll);
  document.documentElement.classList.remove('is-home-page');
  document.body.classList.remove('is-home-page');
  const navbar = document.querySelector('.VPNavBar');
  if (navbar) {
    navbar.classList.remove('scrolled');
  }
};

// Apply medium zoom on load
onMounted(() => {
  setupMediumZoom();
  setupNavbarTransparency();
});

onUnmounted(() => {
  cleanupNavbarTransparency();
});

// Subscribe to route changes
router.onAfterRouteChanged = () => {
  setupMediumZoom();
  updateHomeClass();
  setTimeout(handleScroll, 50);
};
</script>

<template>
  <Layout />
</template>

<style>
.medium-zoom-overlay {
  backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>