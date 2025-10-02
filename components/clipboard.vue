<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineProps<{
  term: string;
  count: number | undefined;
}>();

const source = useTemplateRef("clip-source");
const { text, copy, copied, isSupported } = useClipboard();
</script>
<template v-if="searchTerm">
  <hr />
  <div ref="clip-source">{{ count }}&nbsp;&times;&nbsp;{{ term }}</div>
  <button @click="copy(source?.innerText || '')">📋</button>
</template>
