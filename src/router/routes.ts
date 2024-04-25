import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/HomeMainPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'feed', component: () => import('pages/Feed/FeedPage.vue') },
      {
        path: 'feed/:id',
        component: () => import('pages/Feed/FeedDetailPage.vue'),
      },
      {
        path: 'feed/modify/:id',
        component: () => import('pages/Feed/FeedModifyPage.vue'),
      },
      { path: 'map', component: () => import('pages/MapPage.vue') },
      { path: 'mypage', component: () => import('pages/MyPage.vue') },
      {
        path: 'write',
        component: () => import('pages/PloggingWrite/PloggingWritePage.vue'),
      },
      {
        path: 'write-second',
        component: () =>
          import('pages/PloggingWrite/PloggingWriteSecondPage.vue'),
      },
      {
        path: 'write-third',
        component: () =>
          import('pages/PloggingWrite/PloggingWriteThirdPage.vue'),
      },
      {
        path: 'write-end',
        component: () => import('pages/PloggingWrite/PloggingWriteEndPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
