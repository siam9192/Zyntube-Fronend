import { ReactNode } from 'react';
import { EUserRole } from '../types/user.type';
import useCurrentUser from '../hooks/useCurrentUser';
import { Navigate, useNavigate } from 'react-router-dom';
import PageLoading from '../component/loading/PageLoading';

interface IProps {
  roles: EUserRole[];
  children: ReactNode;
}
function Auth(props: IProps) {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <PageLoading />;
  }
  if (!user || !props.roles.includes(user.app.role)) {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default Auth;
