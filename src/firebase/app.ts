import { auth } from './index';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import axiosInstance from '../axios';
import {
  browserName,
  osName,
  osVersion,
  mobileModel,
  isMobile,
  isTablet,
  isDesktop,
} from 'react-device-detect';

type DeviceType = EDeviceType;

const getDeviceType = (): DeviceType => {
  if (isMobile) return EDeviceType.MOBILE;
  if (isTablet) return EDeviceType.TABLET;
  if (isDesktop) return EDeviceType.DESKTOP;
  return EDeviceType.UNKNOWN;
};

import { getIpAddress } from '../services/util.service';
import { EDeviceType } from '../types/session.type';

export const loginWithGoogle = async (args?: {
  onStart?: () => void;
  onSuccess: () => void;
  onError?: (message: string) => void;
}) => {
  try {
    args?.onStart && args.onStart();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const ip = await getIpAddress();
    const deviceName = mobileModel === 'none' ? 'Unknown' : mobileModel;
    const payload = {
      accessToken,
      browser: browserName,
      ip,
      userAgent: navigator.userAgent,
      device: {
        name: deviceName,
        type: getDeviceType(),
        osName: osName || 'Unknown',
        osVersion: osVersion || 'Unknown',
      },
    };

    const res = await axiosInstance.post('/auth/google-callback', payload);
    const data = res.data.data;
    Cookies.set('accessToken', data.accessToken, {
      secure: false,
      expires: 1000 * 60 * 60 * 24 * 7,
    });
    Cookies.set('refreshToken', data.refreshToken, {
      secure: false,
      expires: 1000 * 60 * 60 * 24 * 7,
    });
    args?.onSuccess && args.onSuccess();
  } catch (error: any) {
    console.log(error);
    args?.onError && args.onError(error.response.data.message);
  }
};

export async function signout() {
  await signOut(auth);
}
