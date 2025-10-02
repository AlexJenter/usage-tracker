<script setup lang="ts">
import { ref, type VNodeRef } from "vue";
import Clipboard from "../components/clipboard.vue";
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxRoot,
  useFilter,
  ListboxItemIndicator,
} from "reka-ui";
import MonthPicker from "../components/monthPicker.vue";
import { useClipboard } from "@vueuse/core";
const { status, data } = await useFetch("/api/usage", { lazy: true });

const selectedRow = ref(data[0]);
const searchTerm = ref("");
const monthFilter = ref(-1);
const { contains } = useFilter({ sensitivity: "base" });

const filteredRows = computed(() =>
  data.value
    ?.filter((p) => monthFilter.value === -1 || p.month === monthFilter.value)
    ?.filter((p) => contains(p.name, searchTerm.value))
);

const resetFilter = () => {
  searchTerm.value = "";
  monthFilter.value = -1;
};
</script>

<template>
  <div>
    <ListboxRoot
      v-model="selectedRow"
      @keydown.esc="resetFilter()"
      highlightOnHover
      class="ListboxRoot"
    >
      <ListboxFilter autofocus v-model="searchTerm" class="ListboxFilter" />
      <MonthPicker
        v-if="monthFilter !== -1"
        :month="monthFilter"
        @update="(e) => (monthFilter = e)"
      />
      <ListboxContent class="ListboxContent">
        <ListboxItem
          class="ListboxItem"
          v-for="row in filteredRows"
          :key="row.date + row.name"
          :value="row"
        >
          <span>{{ row.date }}</span>
          <span @click="monthFilter = row.month">{{ row.monthName }}</span>
          <span @click="searchTerm = row.name">{{ row.name || row.ean }}</span>
        </ListboxItem>
      </ListboxContent>
    </ListboxRoot>

    <Clipboard
      v-if="searchTerm"
      :count="filteredRows?.length"
      :term="searchTerm"
    ></Clipboard>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font: inherit;
}
body {
  display: flex;
  align-items: center;
  justify-content: start;
  font-family: Spot Mono, "Courier New", Courier, monospace;
}
.ListboxFilter {
  width: 100%;
}
.ListboxContent {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
.ListboxRoot {
}

.ListboxItem {
  display: grid;
  gap: 2rem;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  &[data-highlighted] {
    background-color: pink;
  }
}
</style>
