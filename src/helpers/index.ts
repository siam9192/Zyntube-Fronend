import Cookies from 'js-cookie';
export function setAccessToken(accessToken: string) {
  Cookies.set('accessToken', accessToken as string, {
    expires: 60 * 24 * 60 * 60 * 1000,
  });
}
