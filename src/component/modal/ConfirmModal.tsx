import { ReactNode, useState } from 'react';
import { LuTriangleAlert } from 'react-icons/lu';

interface IProps {
  onconfirm: () => void;
  oncancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  disabled?: boolean;
  children: ReactNode;
  heading?: string;
  description?: string;
}
function ConfirmModal({
  onconfirm,
  oncancel,
  confirmButtonText,
  cancelButtonText,
  children,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handelCancel = () => {
    setIsOpen(false);
    oncancel && oncancel();
  };

  const handelConfirm = () => {
    setIsOpen(false);
    onconfirm();
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="w-fit h-fit">
        {children}
      </div>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="w-full transition-all duration-500 inset-0 bg-gray-950/40 h-screen fixed flex justify-center items-center  z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className=" xl:w-1/4 lg:w-1/3 md:w-1/2 w-10/12 bg-white min-h-52 rounded-lg p-5 text-center flex justify-center items-center flex-col gap-3 font-primary"
          >
            <div className="size-fit text-4xl bg-pink-100 p-3 rounded-full text-primary">
              <LuTriangleAlert />
            </div>
            <p className="text-lg text-black font-medium">Are you sure?</p>
            <p className="text-sm text-gray-600  ">
              You're about to perform an irreversible action that cannot be undone. Please review
              your decision carefully and make sure you're certain before proceeding with this
              change.
            </p>
            <div className="w-full space-y-2">
              <button
                onClick={handelConfirm}
                className=" w-full py-2 bg-primary text-white rounded-md"
              >
                {confirmButtonText || "Yes, I'm sure."}
              </button>
              <button
                onClick={handelCancel}
                className=" w-full py-2 border border-gray-700/20  rounded-md hover:bg-gray-100"
              >
                {cancelButtonText || 'No, Cancel it'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ConfirmModal;
