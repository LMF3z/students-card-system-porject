import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../internal/store'
import { router } from '../../routes/routes.constants'

export const PrivateRoute = () => {
  const { isAuth } = useAuthStore()

  if (!isAuth) {
    return <Navigate to={router.loginScreen} replace={true} />
  }

  return <Outlet />
}
