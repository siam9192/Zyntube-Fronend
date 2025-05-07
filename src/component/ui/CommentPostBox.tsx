import Avatar from './Avatar';

function CommentPostBox() {
  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <Avatar
          url="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
          className="size-14 rounded-full"
        />
        <textarea
          name=""
          id=""
          placeholder="Write here..."
          className="md:min-h-32 min-h-20 max-h-80 border-2 border-gray-700/20 w-full  p-2 rounded-md focus:outline-secondary  placeholder:font-medium  font-primary"
        ></textarea>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button className="px-6 py-2 bg-gray-100  rounded-md text-black">Clear</button>
        <button className="px-6 py-2 bg-primary hover:bg-pink-700  rounded-md text-white">
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default CommentPostBox;
