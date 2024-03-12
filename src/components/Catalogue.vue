<template>
  <ul>
    <li v-for="item in catalogueList" :key="item.key">
      <RouterLink :to="item.path">{{ item.title }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
const catalogueList = [
  {
    key: "view-transitions-api",
    path: "/articles/view-transitions-api",
    title: "View transitions api",
  },
];
</script>
