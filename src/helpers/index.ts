import axios from 'axios';
import Cookies from 'js-cookie';
export function setAccessToken(accessToken: string) {
  Cookies.set('accessToken', accessToken as string, {
    expires: 60 * 24 * 60 * 60 * 1000,
  });
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'lw35ssat');

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/ddlfpv4gl/image/upload`,
    formData,
    {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent?.total);
      },
    },
  );
  return response.data.secure_url;
};

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'lw35ssat');

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/ddlfpv4gl/image/upload`,
    formData,
    {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent?.total);
      },
    },
  );
  return response.data.secure_url;
};

export function dataURLToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]); // decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}
