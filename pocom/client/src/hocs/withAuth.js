import React from "react";
import { isAuthenticated } from "../utils/auth";
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

    if (isAuthenticatedValue.loggedIn) {
      return <Component {...isAuthenticatedValue} />;
    } else {
      swalAlert("Error", "Debe iniciar sesión para acceder a esta página", "error").then(() => {
        window.location.href = '/login';
      })
    }
  };
  return AuthRoute;
};

export default withAuth;