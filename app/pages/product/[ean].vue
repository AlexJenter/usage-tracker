<script setup lang="ts">
const config = useRuntimeConfig();

const { data } = await useFetch("/api/products", {
    headers: { "x-api-key": config.apiKey },
});

const route = useRoute();
</script>

<template>
    <h1>ean - {{ route.params.ean }}</h1>
    <code>
        <pre>{{ JSON.stringify(data, null, 4) }}</pre>
    </code>
</template>
