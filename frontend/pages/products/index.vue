<script setup>
definePageMeta({
  layout: "panel",
});
import { onMounted } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { RouterLink } from 'vue-router';
const productStore = useProductStore();
onMounted(async () => {
  await productStore.fetchProducts();
});


</script>
<template>
        <header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Products page
            </h2>
        </header>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <NavLink
                                className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                href="/products/create"
                            >
                                Create Product
                            </NavLink>
                        </div>
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 w-20">No.</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">SKU</th>
                                    <th className="px-4 py-2">Details</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in productStore.products" :key="product.id">
                                    <td className="border px-4 py-2">{{product.id}} </td>
                                    <td className="border px-4 py-2">{{product.name}} </td>
                                    <td className="border px-4 py-2">{{product.sku}} </td>
                                    <td className="border px-4 py-2">{{product.detail}} </td>
                                    <td className="border px-4 py-2">
                                        <RouterLink
                                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                            :to="`/products/edit?id=${product.id}`"
                                        >
                                            Edit
                                        </RouterLink>
                                        <button
                                            tabIndex="-1"
                                            type="button"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</template>