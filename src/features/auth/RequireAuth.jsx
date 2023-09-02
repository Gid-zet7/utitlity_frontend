import { Navigate, Outlet, useLocation } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = UseAuth();

  const content = (
      roles.some(role => allowedRoles.includes(roles)) ? <Outlet /> : <Navigate to="/login" state={{ from: location}} replace />

  )
  // let content;
  // isAdmin
  //   ? (content = <Outlet />)
  //   : (content = <Navigate to="/login" state={{ from: location }} replace />);

  return content;
};

export default RequireAuth;
