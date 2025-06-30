import { HiOutlineDotsVertical } from 'react-icons/hi';

function ContentTableLoadingCard() {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-4  text-gray-900  dark:text-white min-w-[600px] ">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </th>
      <td className="px-6 py-4">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 min-w-[200px]">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 text-right ">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 text-right ">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 text-right ">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 text-right ">
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </td>
      <td className="px-6 py-4 text-right  relative">
        <button className="text-xl  text-black">
          <HiOutlineDotsVertical />
        </button>
      </td>
    </tr>
  );
}

export default ContentTableLoadingCard;
