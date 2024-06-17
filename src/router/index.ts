import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from 'src/stores/authStore';
import { useQuasar } from 'quasar';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // 로그인하지 않았을 시 내비게이션 가드
  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore();
  //   const $q = useQuasar();

  //   if (
  //     !authStore.isLoggedIn &&
  //     to.path !== '/signin' &&
  //     to.path !== '/signup'
  //   ) {
  //     $q.notify({
  //       message: '로그인 후 이용해주세요',
  //       type: 'negative',
  //       position: 'bottom',
  //       color: 'red',
  //     });
  //     next('/signin');
  //   } else {
  //     next();
  //   }
  // });

  return Router;
});
