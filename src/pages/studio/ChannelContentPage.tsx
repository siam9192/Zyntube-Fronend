import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdOutlinePublic } from 'react-icons/md';
import ContentTableCard from '../../component/cards/ContentTableCard';

const ChannelContentPage = () => {
  const tableHeadings = [
    'Video',
    'Visibility',
    'Status',
    'Date',
    'Views',
    'Comments',
    'Likes',
    'Dislikes',
    'Action',
  ];
  return (
    <div>
      <h1 className="text-3xl font-semibold text-black font-primary">Channel Content</h1>
      <p className="text-sm text-gray-800">Manage your channel content & videos</p>
      <div className="mt-10">
        <div className="relative overflow-x-auto max-w-[1700px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tableHeadings.map(heading => (
                  <th key={heading} scope="col" className="px-6 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => (
                <ContentTableCard key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChannelContentPage;
