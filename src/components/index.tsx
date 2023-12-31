import dynamic from 'next/dynamic';
import Fallback from '@/components/Fallback';
import MotionComponent from '@/components/MotionComponent';
import PageHeader from './PageHeader';
import PostPreview from './PostPreview';
import ConditionalComponent from '@/components/ConditionalComponent';
import FrontPage from './FrontPage';
import ButtonActions from './ButtonActions';
import AvatarSelector from './AvatarSelector';
import CustomGoogleMap from './CustomGoogleMap';
import SearchComponent from './SearchComponents';
import CustomMap from './CustomMap';
import TruckRoutes from './TruckRoutes';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });
const Darkreader = dynamic(() => import('./Darkreader'), { ssr: false });

export {
  TextEditor,
  Fallback,
  MotionComponent,
  PageHeader,
  PostPreview,
  ConditionalComponent,
  FrontPage,
  ButtonActions,
  AvatarSelector,
  CustomGoogleMap,
  SearchComponent,
  CustomMap,
  TruckRoutes,
  Darkreader,
};
