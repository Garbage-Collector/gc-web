import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const DEFAULTS_HEADERS = api.defaults.headers;
DEFAULTS_HEADERS.post['Content-Type'] = 'application/json';
DEFAULTS_HEADERS.put['Content-Type'] = 'application/json';

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

const setHeaderToken = (token: string) =>
  (DEFAULTS_HEADERS.common['Authorization'] = `Bearer ${token}`);

const deleteHeaderToken = () => delete DEFAULTS_HEADERS.common['Authorization'];

export { api, setHeaderToken, deleteHeaderToken };
