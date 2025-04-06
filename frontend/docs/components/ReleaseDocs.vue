<script setup type="module" lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from "markdown-it";
import axios from 'axios'

const markdown = new MarkdownIt();

const props = defineProps(['versionToken']);
const content = ref('' as string);

onMounted(async () => {
  content.value = (await axios.get('http://localhost:3030/api/archive/' + props.versionToken + '/md')).data;
});

</script>

<div v-html="markdown.render(release.body)" />