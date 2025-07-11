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
import EditVideoPage from '../pages/studio/EditVideoPage';
import ResultPage from '../pages/ResultPage';

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
            path: 'watch/:id',
            element: <WatchPage />,
          },
          {
            path: 'channel/:username',
            element: <ChannelPage />,
          },
          {
            path: 'results',
            element: <ResultPage />,
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
            path: 'publish-video/:id',
            element: <PublishVideoPage />,
          },
          {
            path: 'edit-video/:id',
            element: <EditVideoPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
