<script setup lang="ts">
const config = useRuntimeConfig();

const { data } = await useFetch("/api/products", {
    headers: { "x-api-key": config.apiKey },
});
</script>

<template>
    <h1>index</h1>
    <code>
        <pre>{{ JSON.stringify(data, null, 4) }}</pre>
    </code>
</template>
