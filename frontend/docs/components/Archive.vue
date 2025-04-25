<script setup type="module" lang="ts">

import { ref, onMounted } from 'vue'
import axios from 'axios'

const versions = ref([] as string[]);

onMounted(async () => {
  versions.value = (await axios.get('/api/archive')).data;
});

function versionPresentation(token: string): string {
  return token.replaceAll('_', '.');
}

</script>

<template>
    <div>
      <ul v-for="release of versions">
              <li><a :href="`/downloads/archive/${release}`">{{versionPresentation(release)}}</a></li>
        </ul>
    </div>
</template>