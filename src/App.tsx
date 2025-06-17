import './App.css';
import ProfileSetup from './component/ui/ProfileSetup';
import Provider from './provider/Provider';
import { Outlet } from 'react-router-dom';
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  mobileModel,
  engineName,
  engineVersion,
  isMobile,
  isTablet,
  isBrowser,
} from 'react-device-detect';
import { useEffect } from 'react';
import envConfig from './config/env.config';
function App() {
  console.log({
    browserName,
    browserVersion,
    osName,
    osVersion,
    mobileModel,
    engineName,
    engineVersion,
    isMobile,
    isTablet,
    isBrowser,
  });
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('IP fetch error:', err));
  }, []);
  console.log(envConfig);

  return (
    <>
      <ProfileSetup />
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
