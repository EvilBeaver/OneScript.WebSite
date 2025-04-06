<script setup type="module" lang="ts">

import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['versionToken']);

interface DistDescription {
  id: string,
  filename: string,
  arch: string,
  distType: string,
  modified: string,
  link: string
}

const files = ref([] as DistDescription[]);

onMounted(async () => {
  files.value = (await axios.get('http://localhost:3030/api/archive/' + props.versionToken)).data;
});

</script>

<template>
    <div>
      <table tabindex="0">
          <thead>
            <tr>
              <th>Имя файла</th>
              <th>Вид дистрибутива</th>
              <th>Архитектура</th>
              <th>Дата изменения</th>
            </tr>
          </thead>
          <tbody v-for="distr of files">
            <tr>
              <td><a :href="distr.link">{{ distr.filename }}</a></td>
              <td>{{ distr.distType }}</td>
              <td>{{ distr.arch }}</td>
              <td>{{ distr.modified }}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>