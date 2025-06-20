import StudioHeader from '../shared/StudioHeader';
import { Outlet } from 'react-router-dom';
import StudioSidebar from '../shared/StudioSidebar';
import useCurrentUser from '../../hooks/useCurrentUser';
import StudioSideBarSkeleton from '../skeleton/StudioSideBarSkeleton';
import { useAppSelector } from '../../redux/hook';

function StudioLayout() {
  const { user, isLoading } = useCurrentUser();
  const { isStudioSidebarExpanded } = useAppSelector(st => st.toggle);
  return (
    <div>
      <StudioHeader />
      <div className="lg:flex   gap-6 lg:h-[calc(100vh-90px)]">
        <div
          className={`${isStudioSidebarExpanded ? 'w-[15%]' : 'w-fit'}   lg:block hidden h-full bg-white`}
        >
          {!isLoading ? (
            <StudioSidebar isExpand={isStudioSidebarExpanded} />
          ) : (
            <StudioSideBarSkeleton />
          )}
        </div>
        <div
          className={`${isStudioSidebarExpanded ? 'xl:w-[85%]' : 'w-full'}  mx-auto overflow-hidden hide-scrollbar overflow-y-auto bg-[rgb(247,247,247) p-2`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudioLayout;
