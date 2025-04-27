<script setup type="module" lang="ts">

import { data } from '/archive.data.ts'

function versionPresentation(token: string): string {
  return token.replaceAll('_', '.');
}

</script>

<template>
    <div>
      <ul v-for="release of data">
              <li><a :href="`/downloads/archive/${release}`">{{versionPresentation(release)}}</a></li>
        </ul>
    </div>
</template>