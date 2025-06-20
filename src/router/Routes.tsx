import { Children } from 'react';
import App from '../App';
import CommonLayout from '../component/layout/CommonLayout';
import Home from '../pages/Home';
import WatchPage from '../pages/WatchPage';
import { AccountPage } from '../pages/account/AccountPage';
import StudioLayout from '../component/layout/StudioLayout';
import ChannelContentPage from '../pages/studio/ChannelContentPage';
import ChannelPage from '../pages/ChannelPage';
import CustomizeChannelPage from '../pages/studio/CustomizeChannelPage';
import MySubscribers from '../pages/studio/MySubscribers';
import ChannelAnalysis from '../pages/studio/ChannelAnalysis';
import PublishVideoPage from '../pages/studio/PublishVideoPage';
import Provider from '../provider/Provider';
import Auth from '../middleware/Auth';
import { EUserRole } from '../types/user.type';

const routes = [
  {
    path: '',
    element: (
      <Provider>
        <App />
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <CommonLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'watch',
            element: <WatchPage />,
          },
          {
            path: 'channel/:username',
            element: <ChannelPage />,
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            element: <AccountPage />,
          },
        ],
      },
      {
        path: 'studio',
        element: (
          <Auth roles={[EUserRole.USER]}>
            <StudioLayout />
          </Auth>
        ),
        children: [
          {
            path: '',
            element: <ChannelContentPage />,
          },
          {
            path: 'customize-channel',
            element: <CustomizeChannelPage />,
          },
          {
            path: 'subscribers',
            element: <MySubscribers />,
          },
          {
            path: 'channel-analysis',
            element: <ChannelAnalysis />,
          },
          {
            path: 'publish-video',
            element: <PublishVideoPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
