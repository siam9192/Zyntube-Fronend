import React, { useState } from 'react';
import Avatar from '../../ui/Avatar';
import { BsPatchCheckFill } from 'react-icons/bs';
import { PiShareFat, PiThumbsDownDuotone, PiThumbsUp, PiThumbsUpDuotone } from 'react-icons/pi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const VideoDetails = () => {
  const [isViewFull, setIsViewFull] = useState(false);

  let description = `#hello Lorem ipsum dolor sit amet consectetur https://vidtube-six.vercel.app/watch?v=0g0mnexkp84 adipisicing elit. Cumque dolorem necessitatibus ad, voluptatibus recusandae aliquam amet natus dicta temporibus excepturi voluptas nam sunt doloribus harum nihil dignissimos, ipsam aperiam fugit officia reiciendis inventore a laudantium, rerum voluptate! Cupiditate placeat sapiente pariatur deleniti, quae quidem tenetur? Eum vel optio, natus doloribus mollitia distinctio labore officia unde aperiam quos praesentium dicta cumque aut error laborum voluptatibus fuga tenetur voluptatum in tempore? In possimus accusantium molestias ea? Repellat, itaque. Deleniti, nam a enim, corrupti eius repellendus, possimus nulla inventore neque id necessitatibus tempore sint iusto. Assumenda, at veritatis maxime quidem quo praesentium consequuntur maiores recusandae impedit ipsum accusamus eius a error! Alias nulla dicta veniam id officia placeat, ipsum accusamus ea eos hic natus ipsam quo quod autem, a saepe eius, quas ducimus odit harum. Nostrum, voluptas libero. Incidunt inventore animi impedit obcaecati aperiam eum exercitationem repudiandae velit tempore, distinctio doloribus maiores sint ad dolores neque pariatur minus, quidem suscipit eligendi quasi, quisquam vero expedita repellendus. Consectetur laudantium magni quibusdam ab assumenda rem nisi fuga possimus suscipit voluptatum aliquam, eveniet, dicta, autem voluptate repudiandae sed! Nobis consectetur pariatur nemo laboriosam aperiam consequuntur laudantium nihil voluptas quibusdam. Quam labore repellat ab dignissimos reiciendis, praesentium rem officia cumque qui laborum soluta autem tenetur explicabo, eum eos aut totam quibusdam, accusantium commodi. Consequatur laborum iure vel veritatis, obcaecati voluptate fugit aliquam eveniet non aut placeat deleniti rem, atque asperiores corrupti, ratione rerum beatae nemo. Facilis repudiandae natus aliquid quasi corrupti labore beatae autem doloribus eos optio quas libero unde voluptatem laboriosam, vero earum veritatis dolorum excepturi. Tenetur voluptates, quos veritatis optio reprehenderit odit vitae adipisci dolore illum culpa sequi nulla libero pariatur hic dolores soluta ipsum ut tempora velit. Officiis facilis molestiae enim suscipit. Molestiae culpa minus suscipit quaerat ab commodi recusandae, quia eaque perferendis odit ipsum debitis delectus magni voluptatibus dignissimos inventore in corporis praesentium ea deleniti vero? Nisi reprehenderit numquam sapiente quam laborum ea totam magnam, qui dolore sequi. Incidunt dicta neque, sed eos obcaecati nihil natus assumenda, voluptates itaque qui animi illum! Assumenda hic recusandae asperiores eum doloremque possimus? Laborum mollitia alias nemo accusantium. Laudantium doloribus aliquid sit illo architecto? Quia laboriosam atque unde aliquam excepturi. Obcaecati repudiandae at ad sit distinctio porro harum quae facilis recusandae eligendi? Temporibus quasi cumque, illum voluptatem architecto nisi laudantium hic vel quo veritatis quaerat minima fuga facere culpa delectus placeat vitae, impedit deleniti possimus! Placeat odio sed veniam quasi, eligendi quia reprehenderit iusto! Voluptatem temporibus ab minus aspernatur. Ipsam ad id saepe cum consectetur ipsum quo, qui officia, soluta sapiente dolorem labore amet inventore unde dicta, placeat ducimus. Quisquam, similique! Explicabo nulla vero vitae repellendus beatae quas aliquam, ad ipsa architecto veritatis eveniet cumque impedit ea alias laborum accusamus quisquam consequatur consectetur veniam possimus corrupti, blanditiis quibusdam? Incidunt adipisci, repellendus aliquid eius sit ex, quas, illo vero fugit dignissimos quaerat? Quisquam soluta doloribus sed velit accusamus dolor at quas? Non sed, perspiciatis debitis obcaecati, nisi et officiis voluptatum similique minus facilis accusamus maiores eaque incidunt? Accusantium.
`;
  description = description.replace(/#(\w+)/g, '<a href="#" class="tag">#$1</a>');

  description = description.replace(
    /(https?:\/\/[^\s]+)/g,
    url => `<a class="description__url" href="${url}" target="_blank">${url}</a>`,
  );

  return (
    <div className="py-5">
      <h1 className="md:text-2xl text-xl font-medium text-black">
        Jhol | Coke Studio Pakistan | Season 15 | Maanu x Annural Khalid
      </h1>
      <div className="mt-3">
        <div className="flex  md:flex-row flex-col justify-between md:items-center md:gap-0 gap-4">
          <div className="flex items-center gap-4 ">
            <Avatar
              url="https://yt3.ggpht.com/1MuvHPUzufSwNRsvbbIiuPD9A7gMvJwvoCJX2xmql2PficU-vsSdprlOXpuzrdIpQyMJSRUEjA=s48-c-k-c0x00ffffff-no-rj"
              className="size-12 rounded-full"
            />
            <div>
              <p className="md:text-xl text-lg text-black font-medium">
                Coke Studio Pakistan{' '}
                <span>
                  <BsPatchCheckFill className="inline" size={18} color="" />
                </span>
              </p>

              <p className="text-sm text-gray-800">12.23 M Subscribers</p>
            </div>
          </div>
          <div className="flex items-center  justify-around    gap-4 flex-wrap ">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 py-1 ">
              <button className="px-4  space-x-2 ">
                <span className="text-2xl">
                  <PiThumbsUpDuotone className="inline" />
                </span>
                <span>12K</span>
              </button>
              <button className=" border-l border-gray-600/20  px-4  space-x-2 ">
                <span className="text-2xl">
                  <PiThumbsDownDuotone className="inline" />
                </span>
                <span>12K</span>
              </button>
            </div>

            <button className="px-4  space-x-2  rounded-full bg-gray-100 py-1  ">
              <span className="text-2xl">
                <PiShareFat className="inline" />
              </span>
              <span className="md:inline hidden">Share This</span>
            </button>

            <button className="p-2  text-2xl  rounded-full bg-gray-100 py-1  md:float-none  float-right ">
              <BiDotsHorizontalRounded className="inline" />
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsViewFull(!isViewFull)}
          className="mt-7 p-5 bg-gray-100 rounded-md  hover:cursor-default "
        >
          <p className="text-[1rem] text-black font-medium  mb-2">
            <span>{(2763733).toLocaleString()} Views </span>
            <span>14 Jun 2025</span>
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className={`text-[0.9rem] text-gray-900 leading-[1.8rem] ${!isViewFull ? ' line-clamp-5' : ''} `}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
