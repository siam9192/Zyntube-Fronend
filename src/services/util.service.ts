import axios from 'axios';
import envConfig from '../config/env.config';
import { DEFAULT_ERROR_MESSAGE } from '../utils/constant';

export async function getIpAddress(): Promise<string> {
  try {
    const res = await axios.get(envConfig.url.ipifyAPi);
    const statusCode = res.status;

    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(DEFAULT_ERROR_MESSAGE || 'Failed to fetch IP address.');
    }

    const data = res.data;

    if (!data) {
      throw new Error('IP address not found in response.');
    }

    return data.ip;
  } catch (error: any) {
    console.error('Error fetching IP address:', error);
    throw new Error(error?.message || DEFAULT_ERROR_MESSAGE || 'Something went wrong.');
  }
}
