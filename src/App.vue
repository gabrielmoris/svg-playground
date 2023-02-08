<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-red-900 text-bold text-3xl">
      {{ endpoint }}
    </h1>

    <!-- <iframe
      class="w-full h-screen flex justify-center items-center flex-col"
      :src="'/response.svg'"
    /> -->
    <object
      class="w-full h-screen flex justify-center items-center flex-col"
      :data="'/response.svg'"
    >
      <embed :src="'/response.svg'" width="600" height="400" />
      Error: Embedded data could not be displayed.
    </object>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import axios from "axios";
const endpoint = ref("Hello World");
</script>

<style>
#TX86 {
  fill: blue;
  font: bolder;
  font-size: xx-large;
}
</style>
