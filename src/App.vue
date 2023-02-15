<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-red-900 text-bold text-3xl">Write your Show ID</h1>
    <input type="text" v-model="inputShowId" />
    <button
      class="mt-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-gray-500"
      @click="showStuhle"
    >
      showShuhle
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
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;
const endpoint = ref("http://localhost:3002/");

const hasSaal = ref(false);
const inputShowId = ref("25626955");
const arrayVonStuhle = ref([]);

arrayVonStuhle.value.push({ showID: inputShowId.value });

const acess = async () => {
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
};
onMounted(() => {
  acess();
});

const getSaalplan = async () => {
  endpoint.value = `http://localhost:3002/saalplan/${inputShowId.value}`;
  const { data } = await axios.get(endpoint.value);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.Authorization}`;
  // console.log(data);
  let parser = new DOMParser();
  let doc = parser.parseFromString(data.saalplan, "application/xml");

  const container = document.getElementById("container");
  console.log(doc.documentElement);
  if (container != null) {
    container.appendChild(
      container.ownerDocument.importNode(doc.documentElement, true)
    );
    const script = doc.querySelectorAll("script")[0].innerHTML;

    console.log(script);

    const chairs = document.querySelectorAll("circle");
    chairs.forEach((chair) => {
      chair.addEventListener("click", (e) => {
        console.log(e.target);

        arrayVonStuhle.value.push({ chairSelected: e.target!.id });
      });
    });
    hasSaal.value = true;
  }
};
const showStuhle = () => {
  console.log(arrayVonStuhle.value);
  let text = "";
  arrayVonStuhle.value.forEach((input, index) => {
    if (index === 0) {
      text = text + "Show ID" + input.showID + ",\n";
    } else {
      text = text + " stuhl" + index + " " + input.chairSelected + ",\n";
    }
    console.log(text);
  });

  Swal.fire({
    title: "Deine gewahlte stuhle:",
    text: text,
    icon: "info",
    confirmButtonText: "Danke, tschüs!",
  });
};
</script>

<style>
#TX86 {
  fill: red;
  font: bolder;
  filter: drop-shadow(3px 3px 2px #f16464);
}
</style>
