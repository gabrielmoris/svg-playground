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
      :disabled="buttonName === 'LOGGED!'"
      class="mt-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-gray-500"
      @click="access"
    >
      {{ buttonName }}
    </button>

    <button
      :disabled="hasSaal"
      class="mt-20 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded disabled:bg-gray-500"
      @click="getSaalplan"
    >
      Saalplan
    </button>

    <div class="flex items-center justify-center pt-20" id="container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import swal from "sweetalert";
axios.defaults.withCredentials = true;
const endpoint = ref("http://localhost:3002/");
const buttonName = ref("Login");
const hasSaal = ref(false);
const access = async () => {
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
  buttonName.value = "LOGGED!";
};

const getSaalplan = async () => {
  endpoint.value = "http://localhost:3002/saalplan";
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
  // console.log(data);
  let parser = new DOMParser();
  let doc = parser.parseFromString(data.saalplan, "application/xml");
  const showID = ref(data.showID);
  const container = document.getElementById("container");
  if (container != null) {
    container.appendChild(
      container.ownerDocument.importNode(doc.documentElement, true)
    );
    // const script = doc.querySelectorAll("script")[0].innerHTML;

    // console.log(script);
    const chairs = document.querySelectorAll("circle");
    chairs.forEach((chair) => {
      chair.addEventListener("click", (e) => {
        swal({
          title: `Stuhl ID:${e.target!.id}`,
          text: `Show ID:${showID.value}`,
          icon: "success",
          button: "Danke",
        });
      });
    });
    hasSaal.value = true;
  }
};
</script>

<style>
#TX86 {
  fill: pink;
  font: bolder;
  filter: drop-shadow(3px 3px 2px #cb44dd);
}
</style>
