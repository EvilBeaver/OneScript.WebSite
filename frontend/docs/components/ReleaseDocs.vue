<script setup type="module" lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from "markdown-it";
import axios from 'axios';

const markdown = new MarkdownIt();

const props = defineProps(['versionToken']);
const content = ref('' as string);

onMounted(async () => {
  content.value = (await axios.get('http://localhost:3030/api/archive/' + props.versionToken + '/md')).data;
});

</script>

<style module>

.embed-markdown > h1 {
    font-size: 20px !important;
}

.embed-markdown > h2 {
    font-size: 18px !important;
    margin-top: 10px !important;
}

</style>

<template>
  <div v-html="markdown.render(content)" :class="$style['embed-markdown']"/>
</template>

