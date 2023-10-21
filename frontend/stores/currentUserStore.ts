// useUserStore.ts
import { defineStore } from 'pinia';
import api from '../composables/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '', 
  }),
  actions: {
    async getUserInfo() {
      try {
        const res = await api.get(`/api/get-user`);
        console.log("userInfo", res.data.user);
        this.name = res.data.user.name;
        return this.name;
      } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
      }
    },
  },
});
