import { Outlet } from 'react-router-dom';
import Header from '../shared/Header';
import Sidebar from '../shared/Sidebar';
import { useAppSelector } from '../../redux/hook';

const CommonLayout = () => {
  const toggleState = useAppSelector(st => st.toggle);

  return (
    <>
      <Header />
      <div className="lg:flex   gap-6 lg:h-[calc(100vh-90px)]">
        <div className=" lg:w-fit xl:w-[15%] lg:block hidden h-full bg-white">
          <Sidebar expand={toggleState.isPrimarySidebarExpanded} />
        </div>
        <div className=" w-full xl:w-[85%]  overflow-hidden hide-scrollbar overflow-y-auto bg-[rgb(247,247,247) p-2">
          <Outlet />
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default CommonLayout;
