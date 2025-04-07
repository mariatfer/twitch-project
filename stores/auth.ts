import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    username: '' as string,
    isAuthenticated: false,
  }),
  actions: {
    setAuth(token: string, username: string) {
      this.token = token;
      this.username = username;
      this.isAuthenticated = !!token && !!username;
    },
    clearAuth() {
      this.token = '';
      this.username = '';
      this.isAuthenticated = false;
    },
  },
});