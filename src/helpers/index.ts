import axios from 'axios';
import Cookies from 'js-cookie';
import { IParam } from '../types/util.type';
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

export function capitalize(str: string): string {
  if (!str.length) return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function formatParamsToString(params: IParam[]) {
  const urlSearchParams = new URLSearchParams();
  params.forEach(({ name, value }) => {
    urlSearchParams.append(name, value?.toString() || '');
  });

  const str = urlSearchParams.toString();
  return '?' + (str ? str : '');
}

export function secondsToDurationShort(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num: number) => String(num).padStart(2, '0');

  return hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
}

export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function formatNumber(number: number) {
  if (number < 1000) return number.toString();
  if (number < 1_000_000) return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (number < 1_000_000_000) return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}
