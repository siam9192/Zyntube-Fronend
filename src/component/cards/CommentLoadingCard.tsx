function CommentLoadingCard() {
  return (
    <div className="flex  gap-2 p-2 md:p-5">
      <div className="size-10 rounded-full bg-gray-300 duration-200  animate-pulse"></div>
      <div className="space-y-3 grow">
        <div className="h-4 rounded-lg bg-gray-300 duration-200  animate-pulse lg:w-1/4 w-1/2"></div>
        <div className="h-5 rounded-lg bg-gray-300 duration-200  animate-pulse lg:w-1/2 w-full"></div>
      </div>
    </div>
  );
}

export default CommentLoadingCard;
