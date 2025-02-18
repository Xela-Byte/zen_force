import HomeIcon from '../../assets/bottomIcons/Home.svg';
import HomeIconGreen from '../../assets/bottomIcons/Home-green.svg';
import CoupleIcon from '../../assets/bottomIcons/Heart.svg';
import CoupleIconGreen from '../../assets/bottomIcons/Heart-green.svg';
import ExploreIcon from '../../assets/bottomIcons/search.svg';
import ExploreIconGreen from '../../assets/bottomIcons/search-green.svg';
import ProfileIcon from '../../assets/bottomIcons/Profile.svg';
import ProfileIconGreen from '../../assets/bottomIcons/Profile-green.svg';

export interface BottomTabLinkType {
  key: string;
  linkText: string;
  activeLinkIcon: any;
  inactiveLinkIcon: any;
}

export const bottomTabLinks: BottomTabLinkType[] = [
  {
    key: '1',
    linkText: 'Home',
    activeLinkIcon: HomeIconGreen({}),
    inactiveLinkIcon: HomeIcon({}),
  },
  {
    key: '2',
    linkText: 'Couple',
    activeLinkIcon: CoupleIconGreen({}),
    inactiveLinkIcon: CoupleIcon({}),
  },
  {
    key: '3',
    linkText: 'Explore',
    activeLinkIcon: ExploreIconGreen({}),
    inactiveLinkIcon: ExploreIcon({}),
  },
  {
    key: '4',
    linkText: 'Profile',
    activeLinkIcon: ProfileIconGreen({}),
    inactiveLinkIcon: ProfileIcon({}),
  },
];
