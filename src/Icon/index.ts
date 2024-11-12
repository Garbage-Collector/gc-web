import LikeIcon from './LikeIcon.svg';
import ShareIcon from './ShareIcon.svg';
import BurgerMenuIcon from './BurgerMenuIcon.svg';
import BackArrow from './BackArrow.svg';
import TrashCan from './TrashCanIcon.svg';
import AddBox from './addBox.svg';

interface IconComponents {
  [key: string]: string; // string 타입으로 변경하여 이미지 경로를 저장합니다.
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
