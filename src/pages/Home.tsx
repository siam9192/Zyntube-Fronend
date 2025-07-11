import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Categories from '../component/sections/home/Categories';
import HomeVideos from '../component/sections/home/HomeVideos';
import { useGetHomeFeedVideosQuery } from '../redux/features/video/video.api';
import { IPublicVideo, IVideo } from '../types/video.type';
import { TMeta } from '../types/util.type';

// Types
export type THomeContextValue = {
  isLoading: boolean;
  isFetching: boolean;
  category: string;
  page: number;
  perPage: number;
  refetch: () => void;
  setCategory: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  videos: IPublicVideo[];
  meta: TMeta | undefined;
};

// Context
export const HomeContext = createContext<THomeContextValue | null>(null);

// Component
const Home = () => {
  const [category, setCategory] = useState('all');
  const [perPage] = useState(20);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useGetHomeFeedVideosQuery([
    {
      name: 'category',
      value: category,
    },
  ]);
  const videos = data?.data || [];
  const meta = data?.meta;

  const value: THomeContextValue = {
    isLoading,
    isFetching,
    category,
    perPage,
    page,
    refetch,
    setCategory,
    setPage,
    videos,
    meta,
  };

  return (
    <HomeContext.Provider value={value}>
      <Categories />
      <HomeVideos />
    </HomeContext.Provider>
  );
};

export default Home;
