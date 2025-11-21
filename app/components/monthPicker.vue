<script setup lang="ts">
import { index, inc, dec, name } from "~/composables/useMonthStore";
</script>

<template>
  <div class="MonthPicker">
    <button @click="dec()">-</button>
    <span>{{ name }}</span>
    <button @click="inc()">+</button>
  </div>
</template>

<style scoped>
.MonthPicker {
  display: flex;
  width: 20em;
}
span {
  display: flex;
  justify-content: center;
  flex: 1;
}
button {
  width: 3em;
}
</style>
