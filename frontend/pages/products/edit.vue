<script setup>
definePageMeta({
  layout: "panel",
});
import { onMounted } from "vue";
import QLabel from "@/Components/InputLabel.vue";
import QInput from "@/Components/TextInput.vue";
import QTextArea from "@/Components/TextArea.vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { useProductStore } from "../../stores/productStore";
const productStore = useProductStore();
const selectedProduct = ref({
  name: "",
  detail: "",
});

const productId = route.query.id;
onMounted(async () => {
  await productStore.fetchSelectedProduct(productId);
  selectedProduct.value = productStore.selectedProduct;
});
</script>
<template>
  <header>
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>
  </header>
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 bg-white border-b border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <NavLink class="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none" href="/products"> Back </NavLink>
          </div>
          <form name="createForm" @submit.prevent="submit">
            <div class="flex flex-col">
              <div class="mb-4">
                <QLabel for="name" value="Name" />

                <QInput id="name" type="text" class="mt-1 block w-full" v-model="selectedProduct.name" autofocus />
                <span class="text-red-600"> form.errors.detail </span>
              </div>
              <div class="mb-4">
                <QLabel for="detail" value="Detail" />

                <QTextArea id="detail" class="mt-1 block w-full" v-model="selectedProduct.detail" autofocus />
                <span class="text-red-600"> form.errors.detail </span>
              </div>
            </div>

            <div class="mt-4">
              <button type="submit" class="px-6 py-2 font-bold text-white bg-green-500 rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
