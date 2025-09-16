import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../internal/store';
import { router } from '../../routes/routes.constants';

export const PublicRoute = () => {
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Navigate to={router.homeScreen} replace={true} />;
  }

  return <Outlet />;
};
