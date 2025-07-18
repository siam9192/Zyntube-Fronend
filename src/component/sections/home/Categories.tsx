import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../../pages/Home';

function Categories() {
  const categories = [
    'All',
    'Music',
    'Gaming',
    'Vlogs',
    'Education',
    'Technology',
    'Comedy',
    'Lifestyle',
    'News',
    'Movies & Trailers',
    'Sports',
    'DIY & Crafts',
    'Travel',
    'Beauty & Fashion',
    'Food & Cooking',
    'Reviews & Unboxings',
    'Documentary',
    'Animation',
    'Health & Fitness',
    'Motivation & Self-Help',
    'Live Streams',
  ];

  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useContext must be used within a HomeContext.Provider');
  }
  const { setCategory, setVideos, refetch, isLoading } = context;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setCategory(categories[activeIndex].toLowerCase());
    if (isLoading) return;
    setVideos([]);
    // setTimeout(() => {
    //   refetch();
    // }, 300);
  }, [activeIndex]);

  return (
    <>
      {/* <div className={`${activeIndex !== 0 && "categories_container_before" } categories_container_after relative lg:block hidden `}>
          <button className='text-2xl absolute top-[10px]  text-black font-bold  -left-1  z-10 '>
      <SlArrowLeft  className=' font-bold'/>
      </button>
  <div className=' relative w-full  h-10     overflow-hidden'>
  {
        categories.map((category,index)=>(<CategoryCarouselButton onClick={()=>setActiveIndex(index)} key={index} index={index} activeIndex={activeIndex} name={category}/>))
      }
    
  </div>
  <button className='text-2xl absolute top-[10px]  text-black font-bold  -right-1  z-10 '>
      <SlArrowRight />
      </button>
    </div> */}
      <div className="flex items-center  gap-4 categories_tab_container overflow-x-auto hide-scrollbar ">
        {categories.slice(0, 12).map((category, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            className={` tab__btn px-6 py-2 ${index === activeIndex ? 'active ' : 'bg-gray-100'} rounded-md`}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default Categories;
