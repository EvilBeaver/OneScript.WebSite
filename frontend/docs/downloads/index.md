<script setup>
import Releases from '../components/Releases.vue'
import Archive from '../components/Archive.vue'
</script>

# Скачать OneScript

Рекомендуемым способом установки и обновления 1Script является [менеджер версий ovm](/learn/install#ovm). 

На этой странице представлены версии для ручного скачивания, если автоматизированная установка с помощью ovm по каким-либо причинам вам не подходит.

## Актуальная версия

<small>Последняя выпущенная стабильная версия</small>

<Releases versionToken="latest" />
<ReleaseDocs versionToken="latest" />

## Ознакомительная версия

<small>Относительно стабильная версия для ознакомления и тестирования</small>

<Releases versionToken="preview" />
<ReleaseDocs versionToken="preview" />

## Версия LTS

<small>Старая версия, которая поддерживается в части исправления ошибок</small>

<Releases versionToken="lts" />
<ReleaseDocs versionToken="lts" />

## Версии в разработке

<small>В разработке может находиться как актуальная версия, так и версия предыдущего поколения, которая станет очередной LTS версией.</small>

### Разрабатываемая версия

### Разрабатываемая LTS-версия

## Архив версий

<small>Ниже перечислен полный список версий, которые когда-либо выпускались</small>

<Archive />