import { defineStore } from 'pinia';
import api from '../composables/api';


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    selectedProduct: null,
    isLoadingProducts: false,
  }),

  actions: {
    async fetchProducts() {
      this.isLoadingProducts = true;
      try {
        const res = await api.get<any>('/api/products');
        if (res.data.success) {
          this.products = res.data.data;
          console.log('this.products:', this.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.isLoadingProducts = false;
      }
    },

    async fetchSelectedProductInfos(product) {
      try {
        const res = await api.get<any>(`/api/management/products/${product.id}/show`);
        if (res.data.success) {
          this.selectedProduct = res.data.data;
        }
      } catch (error) {
        console.error('Error fetching selected product:', error);
      }
    },

    async createModal_submit(newProduct) {
      try {
        const newProductObject = {
          name: newProduct.name,
          sku: newProduct.sku,
          detail: newProduct.detail,
        };
        const response = await api.post<any>('/api/management/products', newProductObject, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.success) {
          await this.fetchProducts();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error saving new Product:', error);
        return false;
      }
    },
  },
});
