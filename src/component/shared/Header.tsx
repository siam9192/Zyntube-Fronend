import { SlMenu } from 'react-icons/sl';
import SearchBox from '../ui/SearchBox';
import HeaderUtils from '../ui/HeaderUtils';

function Header() {
  return (
    <header className="md:p-5 p-3  border-b-2 border-gray-600/10 w-full">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button className="md:text-3xl text-2xl font-medium lg:block hidden">
            <SlMenu />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://vidtube-six.vercel.app/images/logo.png"
              alt=""
              className="md:size-10 size-8  "
            />
            <h1 className="lg:text-4xl md:text-3xl text-2xl  uppercase font-semibold font-primary ">
              <span className="text-primary">Zyn</span>Tube
            </h1>
          </div>
        </div>
        {/* Search */}
        <SearchBox />

        {/* Utils */}
        <HeaderUtils />
      </div>
    </header>
  );
}

export default Header;
