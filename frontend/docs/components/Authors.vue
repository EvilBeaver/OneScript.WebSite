<script setup type="module" lang="ts">

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}
</script>

<template>
    <iframe 
        style="width: 100%; height: 2000px; overflow: scroll; border: none"
        src="https://readme-contribs.as93.net/contributors/EvilBeaver/OneScript?avatarSize=80&perRow=5&shape=circle&fontSize=18&margin=40">
    </iframe>
</template>