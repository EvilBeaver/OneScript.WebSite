<template>
  <div class="info-block">
    <div class="info-code">
      <slot name="code">
        <pre><code>{{ code }}</code></pre>
      </slot>
    </div>
    <div class="info-content">
      <h2 class="info-title">{{ title }}</h2>
      <div class="info-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    default: ''
  }
});
</script>

<style>
.info-block {
  display: flex;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  align-items: stretch;
}

.info-code {
  flex-shrink: 0;
  width: 450px;
  display: flex;
  flex-direction: column;
}

/* Style the VitePress code block directly */
.info-code :deep(div[class*='language-']) {
  margin: 0 !important;
  border-radius: 8px !important;
  height: 100%;
}

.info-code :deep(pre) {
  margin: 0;
  padding: 1.25rem !important;
}

.info-code :deep(code) {
  font-size: 0.85rem !important;
  line-height: 1.6;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0 !important;
  padding: 0 !important;
  border: none !important;
}

.info-text {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.info-text p {
  margin: 0 0 1rem 0;
}

.info-text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .info-block {
    flex-direction: column;
    gap: 2rem;
  }
  
  .info-code {
    width: 100%;
  }
}
</style>
