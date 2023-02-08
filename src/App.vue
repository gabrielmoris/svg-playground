<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-red-900 text-bold text-3xl">
      {{ endpoint }}
    </h1>

    <iframe
      class="w-full h-screen flex justify-center items-center flex-col"
      :src="'../public/response.svg'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import axios from "axios";
import svg from "../public/response.svg";
console.log(svg);
const endpoint = ref("Hello World");
</script>
