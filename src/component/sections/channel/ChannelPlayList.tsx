import PlayListCard from '../../cards/PlayListCard';
const ChannelPlayList = () => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2  gap-x-5 gap-y-10">
      {Array.from({ length: 10 }).map((video, index) => (
        <PlayListCard key={index} />
      ))}
    </div>
  );
};

export default ChannelPlayList;
