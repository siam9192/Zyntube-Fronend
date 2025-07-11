import { useState } from 'react';
import RelatedVideos from './RelatedVideos';
import { useParams } from 'react-router-dom';
import VideoComments from './VideoComments';

const tabs = ['Related videos', 'Comments'];

function WatchPageTabs() {
  const [openTab, setOpenTab] = useState(tabs[0]);
  const { id } = useParams();

  return (
    <div>
      <div className="flex items-center gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setOpenTab(tab)}
            className={`px-6 py-3 rounded-full ${tab == openTab ? ' bg-primary  text-white' : 'border'} font-medium font-primary text-sm `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-5">
        {openTab === tabs[0] ? (
          <RelatedVideos id={id as string} />
        ) : (
          <VideoComments videoId={id as string} />
        )}
      </div>
    </div>
  );
}

export default WatchPageTabs;
