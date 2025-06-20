import React, { useRef } from 'react';
import Cropper, { ReactCropperElement, ReactCropperProps } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { dataURLToFile } from '../../helpers';

interface IProps {
  cropperProps: ReactCropperProps;
  onSave: (url: string, file: File) => void;
  image: File;
}
function ImageCropper({ cropperProps, image, onSave }: IProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      const url = croppedCanvas.toDataURL();
      const file = dataURLToFile(url, image.name);
      onSave(url, file);
    }
  };
  return (
    <div className="  fixed inset-0 bg-gray-950/70 flex justify-center items-center z-50">
      <div className="max-h-[60vh]  w-10/12 lg:w-1/3  flex flex-col justify-center items-center">
        <Cropper src={URL.createObjectURL(image)} {...cropperProps} ref={cropperRef} />
        <div className=" bottom-2 right-2 text-end mt-4">
          <button
            onClick={cropImage}
            className="px-6 py-3 bg-secondary hover:bg-primary text-white font-medium rounded-md absolute top-2 right-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
