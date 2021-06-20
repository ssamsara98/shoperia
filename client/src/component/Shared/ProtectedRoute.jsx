import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({ rsAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return rsAuth.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  exact: PropTypes.bool,
  sensitive: PropTypes.bool,
  strict: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  rsAuth: state.auth,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ProtectedRoute);
