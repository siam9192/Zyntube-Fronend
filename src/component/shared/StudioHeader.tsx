import { TbPlus } from 'react-icons/tb';
import Avatar from '../ui/Avatar';
import { SlMenu } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { toggle } from '../../redux/slices/toggle.slice';
import StudioModalSidebar from './StudioModalSidebar';
const StudioHeader = () => {
  const dispatch = useAppDispatch();
  const { isStudioSidebarExpanded } = useAppSelector(st => st.toggle);
  const toggleStudioSidebar = () => {
    dispatch(toggle({ isStudioSidebarExpanded: !isStudioSidebarExpanded }));
  };
  return (
    <header className="p-5 border-b-2 border-gray-700/20">
      <div className="flex justify-between items-center  ">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleStudioSidebar}
            className={`md:text-3xl text-2xl font-medium  hidden lg:block ${isStudioSidebarExpanded ? 'text-primary' : ''}`}
          >
            <SlMenu />
          </button>
          <StudioModalSidebar />
          <div className="flex items-center gap-2">
            <img
              src="https://vidtube-six.vercel.app/images/logo.png"
              alt=""
              className="md:size-10 size-8  "
            />
            <h1 className="lg:text-4xl md:text-3xl text-2xl  uppercase font-semibold font-primary ">
              Studio
            </h1>
          </div>
        </div>
        <div className="flex items-center md:gap-6 gap-3">
          <button className="p-2 md:px-4 md:py-2 flex items-center gap-1 font-semibold bg-gray-200 rounded-md font-primary">
            <span className="text-2xl ">
              <TbPlus />
            </span>
            <span className="font-medium text-gray-900 md:block hidden">Create</span>
          </button>
          <Avatar url="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj" />
        </div>
      </div>
    </header>
  );
};

export default StudioHeader;
