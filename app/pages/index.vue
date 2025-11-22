<!-- app/pages/index.vue -->
<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";

import {
    ListboxContent,
    ListboxFilter,
    ListboxItem,
    ListboxRoot,
    useFilter,
} from "reka-ui";

import {
    dec as decMonthIndex,
    inc as incMonthIndex,
    index as monthIndex,
    set as setMonthIndex,
} from "~/composables/useMonthStore";

const { data } = await useFetch("/api/usage", { lazy: true });
const selectedRow = ref();
const searchTerm = ref("");

const { contains } = useFilter({ sensitivity: "base" });

const filteredRows = computed(() =>
    data.value
        ?.filter((p) => monthIndex.value === -1 || p.month === monthIndex.value)
        ?.filter((p) => contains(p.name, searchTerm.value)),
);

const resetFilter = () => {
    searchTerm.value = "";
    setMonthIndex(-1);
};

onKeyStroke("Escape", resetFilter);
onKeyStroke("ArrowLeft", decMonthIndex);
onKeyStroke("ArrowRight", incMonthIndex);
</script>

<template>
    <div>
        <ListboxRoot v-model="selectedRow" class="ListboxRoot">
            <ListboxFilter
                autofocus
                ref="searchInput"
                v-model="searchTerm"
                class="ListboxFilter"
            />
            <MonthPicker ref="mPicker" />
            <ListboxContent class="ListboxContent">
                <ListboxItem
                    class="ListboxItem"
                    v-for="row in filteredRows"
                    :key="row.date + row.name"
                    :value="row"
                >
                    <span>{{ row.date }}</span>
                    <span @click="setMonthIndex(row.month)">{{
                        row.monthName
                    }}</span>
                    <span @click="searchTerm = row.name">{{
                        row.name || row.ean
                    }}</span>
                </ListboxItem>
            </ListboxContent>
        </ListboxRoot>

        <Clippy
            v-if="searchTerm"
            :count="filteredRows?.length"
            :term="searchTerm"
        ></Clippy>
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
    font-family:
        Spot Mono,
        "Courier New",
        Courier,
        monospace;
}
.ListboxFilter {
    width: 100%;
}
.ListboxContent {
    display: grid;
    grid-template-columns: repeat(3, auto);
}
/*.ListboxRoot {
}*/

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
