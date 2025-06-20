import ImageKit from 'imagekit-javascript';
import axiosInstance from '../axios';
import { v4 as uuidv4 } from 'uuid';
import envConfig from '../config/env.config';

const imagekit = new ImageKit({
  publicKey: envConfig.imagekit.publicKey,
  urlEndpoint: envConfig.imagekit.urlEndpoint,
});

export async function imagekitUpload(file: File) {
  const authResponse = await axiosInstance.get('/imagekit/auth');
  console.log(authResponse.data);
  const authData = await authResponse.data;
  imagekit.upload(
    {
      file,
      fileName: `${file.name}-${uuidv4()}`,
      tags: ['tag1'],
      token: authData.token,
      signature: authData.signature,
      expire: authData.expire,
    },
    function (err: any, result: any) {
      //   console.log(imagekit.url({
      //     src: result.url,
      //     transformation : [{ height: 300, width: 400}]
      //   }));
      console.log(result);
    },
  );
}

export default imagekit;
