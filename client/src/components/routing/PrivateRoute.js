// Imports
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { token, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(
        props // Check if the user is not authenticated and not loading
      ) =>
        !token && !loading ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
