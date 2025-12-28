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

// Handle navbar scroll state on home page
const handleScroll = () => {
  const navbar = document.querySelector('.VPNavBar');
  if (!navbar) return;
  
  const isHome = frontmatter.value.layout === 'home';
  if (!isHome) {
    navbar.classList.remove('scrolled');
    return;
  }
  
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight;
  
  if (scrollY >= heroHeight - 100) {
    navbar.classList.add('scrolled');
  } else {
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