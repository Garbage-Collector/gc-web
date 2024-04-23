import { Component, defineAsyncComponent } from 'vue';

const LikeIcon = defineAsyncComponent(() => import('./LikeIcon.svg'));
const ShareIcon = defineAsyncComponent(() => import('./ShareIcon.svg'));

interface IconComponents {
  [key: string]: Component;
}

const icons: IconComponents = {
  like: LikeIcon,
  share: ShareIcon,
};

export default icons;
// // icons/index.ts
// import { Component } from 'vue';
// const HomeIcon = defineAsyncComponent(() => import('./home.vue'));
// const SettingsIcon = defineAsyncComponent(() => import('./settings.vue'));

// interface IconComponents {
//   [key: string]: Component;
// }

// const icons: IconComponents = {
//   home: HomeIcon,
//   settings: SettingsIcon,
// };

// export default icons;
