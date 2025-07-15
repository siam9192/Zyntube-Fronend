import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const SearchBox = () => {
  const [value, setValue] = useState('');
  const [inFocus, setIsFocus] = useState(false);
  const histories = [...Array(0)].map((_, index) => `SearchHistory-${index + 1}`);

  const navigate = useNavigate();

  const handelNavigate = () => {
    if (!value) return;
    window.location.href = window.location.origin + `/results?search_query=${value}`;
    setIsFocus(false);
  };

  const urlSearchParams = new URLSearchParams(window.location.search);
  const search_query = urlSearchParams.get('search_query');

  return (
    <div className="w-1/3   relative md:block hidden ">
      <div className="md:flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg">
        <span className="text-2xl  text-gray-600">
          <LuSearch />
        </span>
        <input
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyDown={e => e.key.toLowerCase() === 'enter' && handelNavigate()}
          defaultValue={search_query || ''}
          type="text"
          placeholder="Search.."
          className="w-full text-black  border-none outline-none "
        />
      </div>
      <ul
        className={` ${inFocus ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-10 opacity-40'}   duration-100 absolute top-14 left-0  w-full  min-h-60 max-h-72 bg-white z-50 primary-shadow rounded-lg p-5 overflow-y-auto`}
      >
        {histories.length > 0 ? (
          histories.map(history => (
            <li className="list-none   py-2 flex items-center justify-between group" key={history}>
              <Link to={''}>
                <span className="group-hover:text-primary">{history}</span>{' '}
              </Link>
              <button>
                <FiDelete />
              </button>
            </li>
          ))
        ) : (
          <div className=" flex items-center justify-center  text-center h-40">
            <p className="text-lg">No recent searches</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchBox;
