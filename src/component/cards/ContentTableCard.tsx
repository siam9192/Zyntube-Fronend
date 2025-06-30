import { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdOutlineLock, MdOutlinePublic } from 'react-icons/md';
import { EVideoPrivacy, EVideoStatus, IVideo } from '../../types/video.type';
import { capitalize } from '../../helpers';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import { deleteVideo } from '../../services/video.service';
import ConfirmModal from '../modal/ConfirmModal';
interface IProps {
  video: IVideo;
  onDelete?: () => void;
}
const ContentTableCard = ({ video, onDelete }: IProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const current = dropdownRef.current;
      if (!current) return;

      if (!current.contains(target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [isDropDownOpen]);

  async function handelDelete() {
    setIsDropDownOpen(false);
    try {
      const response = await deleteVideo(video.id);
      if (!response.success) return;
      toast.success('Video deleted successfully!');
      onDelete && onDelete();
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  const isProcessing = video.status === EVideoStatus.PROCESSING;
  // https://3.imimg.com/data3/BH/QL/MY-12724382/animation.jpg

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-4  text-gray-900  dark:text-white min-w-[600px]">
        <div className="flex  items-center gap-4">
          <img
            src={video.media.thumbnailUrl}
            alt=""
            className={`object-cover w-52 rounded-lg ${isProcessing ? 'animate-pulse' : ''} `}
          />

          <div>
            <h4 className="text-[1.1rem] text-black font-primary font-medium line-clamp-2">
              {video.title}
            </h4>
            <p className=" line-clamp-2  font-normal text-gray-700 text-[0.7rem mt-1 line-clamp-2 ">
              {video.description}
            </p>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="text-xl text-black">
            {video.setting.privacy === EVideoPrivacy.PRIVATE ? (
              <MdOutlineLock />
            ) : (
              <MdOutlinePublic />
            )}
          </span>
          <p className="text-black font-medium">{capitalize(video.setting.privacy)}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-black font-medium">{capitalize(video.status)}</p>
      </td>
      <td className="px-6 py-4 min-w-[200px]">
        <p className="text-black font-medium">{new Date(video.createdAt).toDateString()}</p>
      </td>
      <td className="px-6 py-4 text-right ">
        <p className="text-black font-medium">{video.state.viewsCount.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4 text-right ">
        <p className="text-black font-medium">{(0).toLocaleString()}</p>
      </td>
      <td className="px-6 py-4 text-right ">
        <p className="text-black font-medium">{video.state.likesCount.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4 text-right ">
        <p className="text-black font-medium">{video.state.dislikesCount.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4 text-right  relative">
        <button
          onClick={e => {
            e.stopPropagation();
            setIsDropDownOpen(true);
          }}
          className="text-xl  text-black"
        >
          <HiOutlineDotsVertical />
        </button>

        <div
          ref={dropdownRef}
          className={`text-start absolute  right-0 w-40 min-h-20 bg-white  shadow-xl z-40 rounded-md p-5  space-y-2   gap-3 ${isDropDownOpen ? 'opacity-100' : 'opacity-0'} transition-all`}
        >
          <Link to={`edit-video/${video.id}`}>
            <button className=" text-black font-medium block">Edit This</button>
          </Link>
          <ConfirmModal onconfirm={handelDelete}>
            <button className=" text-black font-medium  hover:text-red-500 block">Delete</button>
          </ConfirmModal>
        </div>
      </td>
    </tr>
  );
};

export default ContentTableCard;
