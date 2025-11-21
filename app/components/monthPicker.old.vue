<script setup lang="ts">
import { store } from "../composables/useMonthStore.js";
</script>

<template>
    <div class="MonthPicker">
        <button @click="store.decrement()">-</button>
        <span>{{ store.name() }}</span>
        <button @click="store.increment()">+</button>
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
