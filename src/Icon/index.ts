import { Component, defineAsyncComponent } from 'vue';

const LikeIcon = defineAsyncComponent(() => import('./LikeIcon.svg'));
const ShareIcon = defineAsyncComponent(() => import('./ShareIcon.svg'));
const BurgerMenuIcon = defineAsyncComponent(
  () => import('./BurgerMenuIcon.svg'),
);
const BackArrow = defineAsyncComponent(() => import('./BackArrow.svg'));
const TrashCan = defineAsyncComponent(() => import('./TrashCanIcon.svg'));
const AddBox = defineAsyncComponent(() => import('./addBox.svg'));

interface IconComponents {
  [key: string]: Component;
}

const icons: IconComponents = {
  like: LikeIcon,
  share: ShareIcon,
  burgerMenu: BurgerMenuIcon,
  trashCan: TrashCan,
  backArrow: BackArrow,
  addBox: AddBox,
};

export default icons;
