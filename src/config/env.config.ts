const envConfig = {
  url: {
    serverBase: import.meta.env.VITE_SERVER_BASE_URL,
    ipifyAPi: import.meta.env.VITE_IPIFY_API_URL,
  },
  imgBB: {
    apiKey: 'c9c302a9d5cee64c8eb4dde4d9803027',
    uploadApi: 'https://api.imgbb.com/1/upload',
  },
  imagekit: {
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
    privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY as string,
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY as string,
  },
};

export default envConfig;
