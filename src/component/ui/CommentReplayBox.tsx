import React, { useEffect, useRef } from 'react';
interface IProps {
  onCancel?: () => void;
  onPost?: () => void;
}
function CommentReplayBox({ onCancel, onPost }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  //  useEffect(()=>{
  //    const handler = (e:MouseEvent)=>{
  //        const target = e.target as Node

  //        const current = ref.current

  //        if(!current) return

  //       if(!current.contains(target)){
  //        onCancel && onCancel()
  //       }
  //    }

  //    document.addEventListener("click",handler)

  //    return ()=>{
  //     document.removeEventListener("click",handler)
  //    }
  //  },[])

  return (
    <div className="p-2" ref={ref}>
      <div className="flex gap-2">
        <img
          src="https://yt3.ggpht.com/1MuvHPUzufSwNRsvbbIiuPD9A7gMvJwvoCJX2xmql2PficU-vsSdprlOXpuzrdIpQyMJSRUEjA=s48-c-k-c0x00ffffff-no-rj"
          alt=""
          className="size-8 rounded-full"
        />
        <div className=" grow">
          <textarea
            name=""
            id=""
            placeholder="Write your replay.."
            className="p-2  outline-none w-full min-h-14 max-h-32 border-2  border-secondary rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={() => onCancel && onCancel()} className="font-semibold text-gray-700">
          Cancel
        </button>
        <button className="font-semibold text-primary">Post</button>
      </div>
    </div>
  );
}

export default CommentReplayBox;
