---
aside: false
prev: false
next: false
---

<script setup>
import Releases from '../../components/Releases.vue'
import ReleaseDocs from '../../components/ReleaseDocs.vue'
import { useData } from 'vitepress'

// params is a Vue ref
const { params } = useData()

</script>

# Версия {{$params.version}}

Последняя выпущенная стабильная версия

<Releases :versionToken="params.version" />
<ReleaseDocs :versionToken="params.version" />
