<script setup lang="ts">
const { status, data } = await useFetch("/api/usage", { lazy: true });
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ date, name } in data">
        <td>{{ date }}</td>
        <td>{{ name }}</td>
      </tr>
    </tbody>
  </table>
</template>
