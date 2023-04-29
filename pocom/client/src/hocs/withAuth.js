import React from "react";
import { isAuthenticated } from "../utils/auth";
import Login from "../pages/Login";
import { swalAlert } from '../utils/alerts';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const [isAuthenticatedValue, setIsAuthenticatedValue] = React.useState(null);

    React.useEffect(() => {
      const checkAuth = async () => {
        const isAuthenticatedValue = await isAuthenticated();
        setIsAuthenticatedValue(isAuthenticatedValue);
      };
      checkAuth();
    }, []);

    if (isAuthenticatedValue === null) {
      return null; // or loading spinner
    }

    if (isAuthenticatedValue) {
      return <Component {...props} />;
    } else {
      swalAlert("Error", "Debe iniciar sesión para acceder a esta página", "error")
    }
  };
  return AuthRoute;
};

export default withAuth;