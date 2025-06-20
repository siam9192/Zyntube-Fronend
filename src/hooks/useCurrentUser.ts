import React, { useContext } from 'react';
import { CurrentUserProviderContext } from '../provider/CurrentUserProvider';

function useCurrentUser() {
  const context = useContext(CurrentUserProviderContext);
  if (!context) throw new Error('Must be used within a CurrentUserProvider');
  return context;
}

export default useCurrentUser;
