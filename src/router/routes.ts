import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/loading',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'home',
        component: () => import('pages/HomeMainPage.vue'),
      },
      {
        path: 'feed',
        component: () => import('pages/Feed/FeedPage.vue'),
      },
      {
        path: 'feed/:id',
        component: () => import('pages/Feed/FeedDetailPage.vue'),
      },
      {
        path: 'feed/shared/:id/:userId',
        component: () => import('pages/Feed/SharedUserFeedDetailPage.vue'),
      },
      {
        path: 'feed/modify/:id',
        component: () => import('pages/Feed/FeedModifyPage.vue'),
      },
      {
        path: 'map',
        component: () => import('pages/MapPage.vue'),
      },
      {
        path: 'mypage',
        component: () => import('pages/MyPage/MyPage.vue'),
      },
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
      {
        path: 'init',
        component: () => import('pages/InitPage.vue'),
      },
      {
        path: 'checkPassword',
        component: () => import('pages/MyPage/CheckPasswordPage.vue'),
      },
      {
        path: 'checkPasswordForNickname',
        component: () =>
          import('pages/MyPage/CheckPasswordForNicknamePage.vue'),
      },
      {
        path: 'changePassword',
        component: () => import('pages/MyPage/ChangePasswordPage.vue'),
      },
      {
        path: 'changeNickname',
        component: () => import('pages/MyPage/ChangeNicknamePage.vue'),
      },
    ],
  },
  {
    path: '/signin', // MainLayout을 사용하지 않는 경로
    component: () => import('src/pages/SignInPage.vue'),
  },
  {
    path: '/signup', // MainLayout을 사용하지 않는 경로
    component: () => import('src/pages/SignUp/SignUpPage.vue'),
  },
  {
    path: '/signup-verify', // MainLayout을 사용하지 않는 경로
    component: () => import('src/pages/SignUp/SignUpVerifyPage.vue'),
  },
  {
    path: '/signup-third', // MainLayout을 사용하지 않는 경로
    component: () => import('src/pages/SignUp/SignUpThirdPage.vue'),
  },
  {
    path: '/forgot-password', // 이 경로를 추가해야 함
    component: () => import('src/pages/ForgotPassword/ForgotPasswordPage.vue'), // 실제 컴포넌트 경로
  },
  {
    path: '/forgot-verify', // 이 경로를 추가해야 함
    component: () =>
      import('src/pages/ForgotPassword/ForgotPasswordVerifyPage.vue'), // 실제 컴포넌트 경로
  },
  {
    path: '/forgot-update', // 이 경로를 추가해야 함
    component: () =>
      import('src/pages/ForgotPassword/ForgotPasswordUpdatePage.vue'), // 실제 컴포넌트 경로
  },
  {
    path: '/loading',
    component: () => import('src/pages/LoadingPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
