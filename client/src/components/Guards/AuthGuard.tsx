import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../Static';
import { getUserDetails } from '../../Store/services/user';
import { updateUser, getUserError } from '../../Store/slices/userSlice';
import { useAppDispath } from '../../Store/hooks';

type Props = {
  children: JSX.Element;
};

export function AuthGuard(props: Props) {
  const dispatch = useAppDispath();
  const { children } = props;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const fetchUser = async () => {
    try {
      const { data } = await getUserDetails();
      dispatch(updateUser(data));
      setIsAuthenticated(true);
    } catch (error) {
      dispatch(getUserError(error));
      // navigateToLogin();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigateToLogin();
    } else {
      // TODO: validate token with API call
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return null;
}
