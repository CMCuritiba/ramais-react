import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper(
  { isPrivate, selected, component: Component },
  ...rest
) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/signin" />;
  }

  // if (signed && !isPrivate) {
  //   return <Redirect to="/" />;
  // }

  const Layout = signed ? AuthLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout selected={selected}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
