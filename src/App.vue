<template>
  <div>
    <h1 class="text-red-900 text-bold text-3xl">
      {{ endpoint }}
    </h1>
    <!-- <image :src="svg" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import axios from "axios";
import * as svg from "./assets/response.svg";
const endpoint = ref("Hello World");
</script>
