<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-red-900 text-bold text-3xl">Server in:</h1>
    <a
      class="text-red-900 text-bold text-3xl hover:text-blue-800 hover:font-bold"
      :href="endpoint"
      target="_blank"
      >Localhost</a
    >
    <button
      class="mt-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      @click="access"
    >
      {{ buttonName }}
    </button>

    <button
      class="mt-20 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      @click="getSaalplan"
    >
      Saalplan
    </button>

    <div class="flex items-center justify-center pt-20" id="container"></div>

    <!-- <iframe
      class="w-full h-screen flex justify-center items-center flex-col"
      :src="'/response.svg'"
    /> -->

    <!-- <object
      v-if="svg"
      class="w-full h-screen flex justify-center items-center flex-col"
      :data="'/response.svg'"
    >
      <embed v-bind:src="'/response.svg'" width="600" height="400" />
      Error: Embedded data could not be displayed.
    </object> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
axios.defaults.withCredentials = true;
const endpoint = ref("http://localhost:3002/");
const buttonName = ref("Login");
const svg = ref();

const access = async () => {
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
  console.log(JSON.parse(data));
};

const getSaalplan = async () => {
  endpoint.value = "http://localhost:3002/saalplan";
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
  let parser = new DOMParser();
  let doc = parser.parseFromString(data, "application/xml");
  // svg.value = doc;
  const container = document.getElementById("container");
  if (container != null)
    container.appendChild(
      container.ownerDocument.importNode(doc.documentElement, true)
    );
  console.timeLog(data);
};
</script>

<style>
#TX86 {
  fill: pink;
  font: bolder;
  filter: drop-shadow(3px 3px 2px #cb44dd);
}
</style>
