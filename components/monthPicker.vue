<script setup lang="ts">
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

defineProps<{
  month: number;
}>();

defineEmits(["update"]);

const dec = (m: number) => (12 + m - 1) % 12;
const inc = (m: number) => (m + 1) % 12;
</script>

<template>
  <div class="MonthPicker">
    <button @click="$emit('update', dec(month))">-</button>
    <span>{{ months[month] }}</span>
    <button @click="$emit('update', inc(month))">+</button>
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
