import { defineStore } from 'pinia';
import { api, deleteHeaderToken } from 'src/boot/axios';
import { useProfileStore } from './profileStore';

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
    async login() {
      // this.authRequired = false;

      try {
        const profileStore = useProfileStore();
        const res = await api.post('/users/signin', {
          email: profileStore.profile.email,
          password: profileStore.profile.password,
        });
        this.isLoggedIn = true;
        profileStore.profile.id = res.data.id;
        profileStore.profile.email = res.data.email;
        profileStore.profile.password = res.data.password;
        profileStore.profile.nickname = res.data.nickname;

        console.log(`로그인 요청 응답 === [ ${JSON.stringify(res.data)}]`);
      } catch (error) {
        console.error('로그인 에러 => ', error);
      }
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
