import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

export const AuthGuard = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigateToLogin();
    } else {
      // TODO: validate token with API call
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return null;
};
