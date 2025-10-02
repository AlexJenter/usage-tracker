<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineProps<{
  term: string;
  count: number | undefined;
}>();

const source = useTemplateRef("clip-source");
const { copy, copied, text } = useClipboard();
</script>

<template>
  <hr />
  <div class="wrapper">
    <template v-if="!copied">
      <div ref="clip-source">{{ count }}&nbsp;&times;&nbsp;{{ term }}</div>
      <button @click="copy(source?.innerText || '')">📋</button>
    </template>
    <template v-else>
      <span>Copied {{ text }}</span>
      <span>🖇️</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button {
  all: unset;
}
</style>
