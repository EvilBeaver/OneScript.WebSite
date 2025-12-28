<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted, onUnmounted } from "vue";
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

// Handle navbar transparency on home page
const handleScroll = () => {
  const navbar = document.querySelector('.VPNavBar');
  if (!navbar) return;
  
  const isHome = frontmatter.value.layout === 'home';
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight;
  
  if (isHome && scrollY < heroHeight - 100) {
    navbar.classList.add('transparent');
  } else {
    navbar.classList.remove('transparent');
  }
};

const setupNavbarTransparency = () => {
  // Initial call with delay to ensure DOM is ready
  setTimeout(handleScroll, 0);
  setTimeout(handleScroll, 100);
  window.addEventListener('scroll', handleScroll);
};

const cleanupNavbarTransparency = () => {
  window.removeEventListener('scroll', handleScroll);
  const navbar = document.querySelector('.VPNavBar');
  if (navbar) {
    navbar.classList.remove('transparent');
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
  // Re-check navbar transparency after route change
  setTimeout(handleScroll, 100);
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