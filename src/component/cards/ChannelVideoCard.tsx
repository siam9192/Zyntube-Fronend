import { BsDot } from 'react-icons/bs';
import VideoCardShortOptions from '../ui/VideoCardShortOptions';
import { Link } from 'react-router-dom';

const ChannelVideoCard = () => {
  return (
    <div className="bg-white relative group w-full">
      <Link to="/watch">
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
            className="md:h-60 h-72 w-full rounded-lg group-hover:hidden block"
          />
          <img
            src="https://64.media.tumblr.com/0f7f92a7b776d46633c1e439ef6a877c/tumblr_inline_o0lu2nvsg41to8h2v_500.gif"
            alt=""
            className="h-60 w-full rounded-lg hidden group-hover:block group-hover:rounded-none duration-100"
          />

          <p className="p-1 rounded-sm text-sm scale-80 bg-primary text-white absolute bottom-2 right-1">
            10:20
          </p>
        </div>
      </Link>
      <Link to="/watch">
        <div className="mt-3 px-2 ">
          <h3 className=" font-medium  text-gray-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, explicabo?
          </h3>
          <div className="mt-2">
            <p className="text-gray-800 text-sm">
              <span>4.3M views</span>{' '}
              <span>
                <BsDot className="inline" />
              </span>{' '}
              <span>4 days ago</span>
            </p>
          </div>
        </div>
      </Link>
      <VideoCardShortOptions className="absolute right-0 bottom-2 text-xl p-2 hover:bg-secondary hover:rounded-full hover:text-white" />
    </div>
  );
};

export default ChannelVideoCard;
