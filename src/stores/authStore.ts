import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    authRequired: false,
  }),

  actions: {
    login() {
      this.isLoggedIn = true;
      this.authRequired = false;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
});
