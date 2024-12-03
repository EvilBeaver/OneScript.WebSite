<script setup type="module">
import { ref } from 'vue';
import { Octokit } from "@octokit/core";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

const octokit = new Octokit({
  // auth: ''
})

const releasesData = await octokit.request('GET /repos/{owner}/{repo}/releases', {
  owner: 'EvilBeaver',
  repo: 'OneScript',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

const releases = ref(releasesData.data);

</script>

<template>
    <div>
        <h1>Releases</h1>

        <div v-for="release in releases">
            <div v-html="markdown.render(release.body)" />
        </div>

    </div>
</template>