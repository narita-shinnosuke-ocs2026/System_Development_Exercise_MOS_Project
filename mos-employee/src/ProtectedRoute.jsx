import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getUser } from './auth'

function ProtectedRoute() {
  const user = getUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}

export default ProtectedRoute
