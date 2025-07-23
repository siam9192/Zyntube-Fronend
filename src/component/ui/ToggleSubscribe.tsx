import { useState } from 'react';
import { toast } from 'sonner';
import ConfirmModal from '../modal/ConfirmModal';
import { subscribeChannel, unsubscribeChannel } from '../../services/channel-subscribe.service';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/constant';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useAppDispatch } from '../../redux/hook';
import { toggle } from '../../redux/slices/toggle.slice';
interface IProps {
  subscribed: boolean;
  channelId: string;
  channelName?: string;
  onToggle?: (st: boolean) => void;
}
function ToggleSubscribe({ subscribed, channelId, channelName, onToggle }: IProps) {
  const { user } = useCurrentUser();
  const [isSubscribed, setIsSubscribed] = useState(subscribed);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  async function toggleSubscribe() {
    //Open login modal on user not existence
    if (!user) return dispatch(toggle({ isOpenLoginModal: true }));

    let st = isSubscribed;
    setIsLoading(true);
    try {
      if (!st) {
        await subscribeChannel({ channelId });
        toast(`You subscribed ${channelName || 'This channel'} `);
      } else {
        await unsubscribeChannel(channelId);
        toast(`You unsubscribed ${channelName || 'This channel'} `);
      }
      st = !st
      setIsSubscribed(
        st
      );
    
      onToggle && onToggle(st);
      setIsSubscribed(st);
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }

  const isDisabled = user?.app.channel.id == channelId || isLoading;

  return (
    <>
      {!isSubscribed ? (
        <button
          onClick={toggleSubscribe}
          disabled={isDisabled}
          className="px-6 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-700 bg-primary  rounded-full text-white font-medium"
        >
          Subscribe
        </button>
      ) : (
        <ConfirmModal onconfirm={toggleSubscribe}>
          <button className="px-6 py-2 text-sm bg-secondary  rounded-full text-white font-medium">
            Subscribed
          </button>
        </ConfirmModal>
      )}
    </>
  );
}

export default ToggleSubscribe;
