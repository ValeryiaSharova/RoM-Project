/* eslint-disable react/require-default-props */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'proptypes';

const ProtectedRoute = ({ isAdmin, component: Component, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAdmin) {
          return <Redirect to={{ pathname: '/answers', state: { from: props.location } }} />;
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  location: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
