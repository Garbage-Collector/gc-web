import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/signin',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/HomeMainPage.vue') },

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
      { path: 'mypage', component: () => import('pages/MyPage/MyPage.vue') },
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
  {
    path: '/signin', // MainLayout을 사용하지 않는 경로
    component: () => import('src/pages/SignInPage.vue'),
  },
  {
    path: '/signup', // MainLayout을 사용하지 않는 경로
    component: () => import('pages/SignUpPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
