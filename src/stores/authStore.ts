import { defineStore } from 'pinia';
import { deleteHeaderToken } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: localStorage.getItem('accessToken') ? true : false,
    isLoggedIn: false,
    authRequired: false,
    token: '',
  }),
  getters: {
    getUserToken(state) {
      try {
        const token = localStorage.getItem('accessToken') ?? '';
        state.token = token;
        return state.token;
      } catch {
        localStorage.removeItem('accessToken');
        deleteHeaderToken();
        state.token = '';
        this.authenticated = false;
        return state.token;
      }
    },
  },

  actions: {
    login() {
      this.isLoggedIn = true;
      this.authRequired = false;
    },
    logout() {
      this.isLoggedIn = false;
    },
    /**
     * JWT를 로컬 스토리지에 저장
     * @param token JSON 데이터 중 accessToken 키값
     */
    setToken(token: string) {
      localStorage.setItem('accessToken', token);
      this.token = token;
      this.authenticated = true;
    },

    /**
     * 로컬 스토리지에 저장된 JWT를 삭제
     */
    setDeleteToken() {
      localStorage.removeItem('accessToken');
      deleteHeaderToken();
      this.token = '';
      this.authenticated = false;
    },
  },
});
