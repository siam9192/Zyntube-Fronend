import StudioHeader from '../shared/StudioHeader';
import { Outlet } from 'react-router-dom';
import StudioSidebar from '../shared/StudioSidebar';

function StudioLayout() {
  return (
    <div>
      <StudioHeader />
      <div className="lg:flex   gap-6 lg:h-[calc(100vh-90px)]">
        <div className=" w-[15%] lg:block hidden h-full bg-white">
          <StudioSidebar />
        </div>
        <div className="lg:w-[85%]  mx-auto overflow-hidden hide-scrollbar overflow-y-auto bg-[rgb(247,247,247) p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudioLayout;
