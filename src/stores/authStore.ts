import { defineStore } from 'pinia';
import { api, deleteHeaderToken, setHeaderToken } from 'src/boot/axios';
import { useProfileStore } from './profileStore';
import { jwtDecode } from 'jwt-decode';
import { startAuthentication } from '@simplewebauthn/browser';

interface DecodedToken {
  exp: number;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: localStorage.getItem('accessToken') ? true : false,
    isLoggedIn: false,
    authRequired: false,
    accessToken: '',
    refreshToken: '',
    verifyCode: 1234,
  }),
  getters: {
    getUserToken(state) {
      try {
        const token = localStorage.getItem('accessToken') ?? '';
        state.accessToken = token;
        return state.accessToken;
      } catch {
        localStorage.removeItem('accessToken');
        deleteHeaderToken();
        state.accessToken = '';
        this.authenticated = false;
        return state.accessToken;
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
        profileStore.profile.password = res.data.password;
        profileStore.profile.nickname = res.data.nickname;
        profileStore.profile.profileImage =
          import.meta.env.VITE_BASE_URL_IMAGE + res.data['profile-image'];

        this.setToken(res.data.accessToken, res.data.refreshToken);
        console.log(res.data);
        console.log(`액세스 토큰 값 === [${this.token}]`);
        console.log(`프로필 이미지 === [${profileStore.profile.profileImage}]`);
        console.log(`로그인 요청 응답 === [ ${JSON.stringify(res.data)}]`);
      } catch (error) {
        console.error('로그인 에러 => ', error);
      }
    },
    async passkeyLogin() {
      try {
        // GET registration options from the endpoint that calls
        // @simplewebauthn/server -> generateRegistrationOptions()
        const profileStore = useProfileStore();
        const email = profileStore.profile.email;
        // console.log(email);

        const resp = await fetch(
          `${import.meta.env.VITE_BASE_URL}/passkey/authentication?email=${encodeURIComponent(email)}`,
        );
        const optionsJSON = await resp.json();

        let asseResp;
        try {
          // Pass the options to the authenticator and wait for a response
          asseResp = await startAuthentication({ optionsJSON });
        } catch (error) {
          console.error('로그인 에러 => ', error);
          // Some basic error handling
          throw error;
        }

        // POST the response to the endpoint that calls
        // @simplewebauthn/server -> verifyRegistrationResponse()
        const verificationResp = await fetch(
          `${import.meta.env.VITE_BASE_URL}/passkey/authentication`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(asseResp),
          },
        );

        // Wait for the results of verification
        const verificationJSON = await verificationResp.json();

        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON.verified) {
          const res = await api.get('/passkey/signin', {
            params: {
              email: email, // 여기서 emailValue는 이메일 값
            },
          });

          this.isLoggedIn = true;
          profileStore.profile.id = res.data.id;
          profileStore.profile.password = res.data.password;
          profileStore.profile.nickname = res.data.nickname;
          profileStore.profile.profileImage =
            import.meta.env.VITE_BASE_URL_IMAGE + res.data['profile-image'];

          this.setToken(res.data.accessToken, res.data.refreshToken);

        }
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
    setToken(accessToken: string, refreshToken: string) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      this.token = accessToken;
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
    /**
     * 이메일 인증번호를 스토어에 저장하는 함수
     * @param verifyCode 서버로부터 받아온 이메일 인증번호
     */
    setVerifyCode(verifyCode: number) {
      this.verifyCode = verifyCode;
    },

    async refreshToken() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) {
          throw new Error('사용 가능한 토큰이 없음');
        }

        const decoded: DecodedToken = jwtDecode(accessToken);
        console.log(`디코딩된 jwt 값 === [${JSON.stringify(decoded)}]`);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - currentTime;

        if (timeLeft < 300) {
          // 5분
          setHeaderToken(refreshToken);
          const response = await api.post('/auth/token/access');
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          this.accessToken = newAccessToken;

          console.log(`갱신한 액세스 토큰 === [${newAccessToken}]`);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    },
  },
});
