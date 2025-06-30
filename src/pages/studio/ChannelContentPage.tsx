import { useState } from 'react';
import ContentTableCard from '../../component/cards/ContentTableCard';
import ContentTableLoadingCard from '../../component/cards/ContentTableLoadingCard';
import Pagination from '../../component/pagination/Pagination';
import useLoadingBounce from '../../hooks/useLoadingBounce';
import { useGetMyVideosQuery } from '../../redux/features/video/video.api';

const ChannelContentPage = () => {
  const tableHeadings = [
    'Video',
    'Visibility',
    'Status',
    'Date',
    'Views',
    'Comments',
    'Likes',
    'Dislikes',
    'Action',
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetMyVideosQuery([
    {
      name: 'page',
      value: currentPage,
    },
  ]);

  const bounceLoading = useLoadingBounce(isLoading, 1000);
  const videos = data?.data;
  const meta = data?.meta;
  const loadingLength = 12;

  return (
    <div>
      <h1 className=" text-2xl lg:text-3xl font-semibold text-black font-primary">
        Channel Content
      </h1>
      <p className="text-sm text-gray-800">Manage your channel content & videos</p>
      <div className="mt-10">
        {bounceLoading || meta?.totalResult ? (
          <div className="relative overflow-x-auto max-w-[1700px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {tableHeadings.map(heading => (
                    <th key={heading} scope="col" className="px-6 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bounceLoading
                  ? Array.from({ length: loadingLength }).map((_, index) => (
                      <ContentTableLoadingCard key={index} />
                    ))
                  : videos?.map((_, index) => (
                      <ContentTableCard video={_} key={index} onDelete={refetch} />
                    ))}
              </tbody>
            </table>
            <div className="mt-5">
              {!bounceLoading && meta && (
                <Pagination {...meta} onPageChange={p => setCurrentPage(p)} />
              )}
            </div>
          </div>
        ) : (
          <div className="h-[70vh] flex flex-col justify-center items-center text-center">
            <img
              src="https://img.freepik.com/free-vector/content-creator-editing-video-footage-studio-editor-publishing-viral-video-social-media-multimedia-production-flat-vector-illustration-motion-design-concept-banner-landing-web-page_74855-21752.jpg?semt=ais_items_boosted&w=740"
              alt=""
              className=" md:w-1/2 xl:w-1/3 mx-auto"
            />
            <p className="text-center text-2xl">Upload your content</p>
            <p className=" lg:w-1/2 mt-2 text-gray-800">
              You haven't uploaded any content yet. Please take a moment to add your content so
              others can see and engage with it. Uploading your content helps you share your ideas,
              connect with others, and make the most of this platform. Don’t wait—start sharing your
              content now!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelContentPage;
