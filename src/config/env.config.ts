const envConfig = {
  url: {
    serverBase: import.meta.env.VITE_SERVER_BASE_URL,
    ipifyAPi: import.meta.env.VITE_IPIFY_API_URL,
  },
  imgBB: {
    apiKey: 'c9c302a9d5cee64c8eb4dde4d9803027',
    uploadUrl: 'https://api.imgbb.com/1/upload',
  },
};

export default envConfig;
