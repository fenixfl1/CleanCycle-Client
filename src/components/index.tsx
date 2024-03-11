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
import TruckRoutes from './TruckRoutes';
import NearestCenter from './NearestCenter';
import RecyclingPointsCard from './RecyclingPointsCard';
import CommentBox from './CommentBox';
import ExchangeItemForm from './ExchangeItemForm';
import ProposalSection from './ProposalSection';
import UserInfo from './UserInfo';
import UserListRender from './UserListRender';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });
const Darkreader = dynamic(() => import('./Darkreader'), { ssr: false });
const CustomMap = dynamic(() => import('./CustomMap'), { ssr: false });

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
  NearestCenter,
  RecyclingPointsCard,
  CommentBox,
  ExchangeItemForm,
  ProposalSection,
  UserInfo,
  UserListRender,
};
